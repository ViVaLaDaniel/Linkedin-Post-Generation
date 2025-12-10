import { NextRequest, NextResponse } from 'next/server';
import { generatePosts } from '@/lib/gemini';

// Типы для API
interface GenerateRequest {
  topic: string;
  style: 'inspirational' | 'educational' | 'success_story' | 'tips' | 'provocative';
  proCode?: string;
}

interface RateLimitEntry {
  count: number;
  date: string;
}

// In-memory хранилище для rate limiting
// Ключ: IP адрес, значение: количество генераций и дата
const rateLimitMap = new Map<string, RateLimitEntry>();

// Лимит генераций в день
const DAILY_LIMIT = 5;

/**
 * Получает IP адрес из запроса
 */
function getClientIP(request: NextRequest): string {
  // Пробуем получить из заголовков (Nginx proxy)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback
  return 'unknown';
}

/**
 * Получает текущую дату в формате YYYY-MM-DD
 */
function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Проверяет rate limit для IP
 * @returns true если лимит НЕ превышен
 */
function checkRateLimit(ip: string, proCode?: string): { allowed: boolean; remaining: number } {
  // PRO пользователи обходят лимит
  if (proCode && isValidProCode(proCode)) {
    return { allowed: true, remaining: Infinity };
  }

  const today = getCurrentDate();
  const entry = rateLimitMap.get(ip);

  // Новый пользователь или новый день
  if (!entry || entry.date !== today) {
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  // Проверяем лимит
  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: DAILY_LIMIT - entry.count - 1 };
}

/**
 * Увеличивает счётчик для IP
 */
function incrementRateLimit(ip: string): void {
  const today = getCurrentDate();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.date !== today) {
    rateLimitMap.set(ip, { count: 1, date: today });
  } else {
    rateLimitMap.set(ip, { count: entry.count + 1, date: today });
  }
}

/**
 * Проверяет PRO код
 */
function isValidProCode(code: string): boolean {
  const proCodes = process.env.PRO_CODES?.split(',') || [];
  return proCodes.includes(code.trim());
}

/**
 * POST /api/generate
 * Генерирует посты с помощью Gemini AI
 */
export async function POST(request: NextRequest) {
  try {
    // Парсим тело запроса
    const body: GenerateRequest = await request.json();
    const { topic, style, proCode } = body;

    // Валидация входных данных
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Тема обязательна для заполнения' },
        { status: 400 }
      );
    }

    if (topic.length > 500) {
      return NextResponse.json(
        { error: 'Тема слишком длинная (максимум 500 символов)' },
        { status: 400 }
      );
    }

    const validStyles = ['inspirational', 'educational', 'success_story', 'tips', 'provocative'];
    if (!style || !validStyles.includes(style)) {
      return NextResponse.json(
        { error: 'Неверный стиль поста' },
        { status: 400 }
      );
    }

    // Получаем IP клиента
    const clientIP = getClientIP(request);

    // Проверяем rate limit
    const rateLimit = checkRateLimit(clientIP, proCode);
    if (!rateLimit.allowed) {
      console.log(`[${new Date().toISOString()}] Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { 
          error: 'Лимит исчерпан. Получите PRO за €19/мес для безлимитных генераций!',
          remaining: 0,
          isPro: false
        },
        { status: 429 }
      );
    }

    // Логируем запрос
    console.log(`[${new Date().toISOString()}] Generation: topic="${topic.substring(0, 50)}...", style=${style}, IP=${clientIP}`);

    // Генерируем посты через Gemini
    const posts = await generatePosts(topic.trim(), style);

    // Увеличиваем счётчик (только для не-PRO)
    if (!proCode || !isValidProCode(proCode)) {
      incrementRateLimit(clientIP);
    }

    // Возвращаем результат
    return NextResponse.json({
      posts,
      remaining: proCode && isValidProCode(proCode) ? Infinity : rateLimit.remaining,
      isPro: proCode ? isValidProCode(proCode) : false
    });

  } catch (error) {
    console.error('[Generate API Error]', error);

    // Обработка известных ошибок
    if (error instanceof Error) {
      // Ошибка парсинга JSON от Gemini
      if (error.message.includes('Failed to parse')) {
        return NextResponse.json(
          { error: 'Ошибка генерации. Попробуйте ещё раз.' },
          { status: 500 }
        );
      }

      // Timeout
      if (error.message.includes('timeout') || error.message.includes('DEADLINE_EXCEEDED')) {
        return NextResponse.json(
          { error: 'Генерация заняла слишком много времени. Попробуйте ещё раз.' },
          { status: 504 }
        );
      }

      // API key missing
      if (error.message.includes('API_KEY')) {
        return NextResponse.json(
          { error: 'Ошибка конфигурации сервера' },
          { status: 500 }
        );
      }
    }

    // Общая ошибка
    return NextResponse.json(
      { error: 'Произошла ошибка при генерации. Попробуйте позже.' },
      { status: 500 }
    );
  }
}

/**
 * GET - для проверки статуса API
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'LinkedIn Post Generator',
    timestamp: new Date().toISOString()
  });
}
