import { GoogleGenerativeAI } from '@google/generative-ai';

// Типы для постов
export interface Post {
  hook: string;
  body: string;
  cta: string;
}

export interface GenerateResponse {
  posts: Post[];
}

// Стили постов с промптами на русском
const STYLE_PROMPTS: Record<string, string> = {
  inspirational: `
    Стиль: ВДОХНОВЛЯЮЩИЙ
    - Мотивирующий тон
    - Личная история или инсайт
    - Призыв к действию и росту
    - Эмоциональное воздействие
    - Используй метафоры и яркие образы
  `,
  educational: `
    Стиль: ОБРАЗОВАТЕЛЬНЫЙ
    - Делись конкретными знаниями
    - Структурированная информация
    - Практические советы
    - Цифры и факты
    - Пошаговые инструкции если уместно
  `,
  success_story: `
    Стиль: ИСТОРИЯ УСПЕХА
    - Рассказ о достижении/преодолении
    - Было/стало формат
    - Конкретные результаты с цифрами
    - Уроки и выводы
    - Честность о трудностях
  `,
  tips: `
    Стиль: СОВЕТЫ
    - 3-5 коротких практических советов
    - Нумерованный или маркированный список
    - Каждый совет - конкретное действие
    - Можно использовать эмодзи для пунктов
    - Легко применить сегодня
  `,
  provocative: `
    Стиль: ПРОВОКАЦИОННЫЙ
    - Противоречивая или смелая идея
    - Вызов устоявшимся мнениям
    - Сильная позиция автора
    - Призыв к дискуссии
    - Не оскорбительно, но заставляет думать
  `,
};

// Названия стилей для отображения
export const STYLE_NAMES: Record<string, string> = {
  inspirational: 'Вдохновляющий',
  educational: 'Образовательный',
  success_story: 'История успеха',
  tips: 'Советы',
  provocative: 'Провокационный',
};

/**
 * Инициализация Gemini клиента
 */
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY не настроен в переменных окружения');
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Генерирует 5 вариантов постов для LinkedIn
 * @param topic - тема поста
 * @param style - стиль поста
 * @returns массив из 5 постов
 */
export async function generatePosts(
  topic: string,
  style: 'inspirational' | 'educational' | 'success_story' | 'tips' | 'provocative'
): Promise<Post[]> {
  const genAI = getGeminiClient();
  
  // Используем стабильную модель gemini-1.5-flash
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.9, // Больше креативности
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4096,
    },
  });

  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.inspirational;

  // Промпт для генерации
  const prompt = `
Ты - эксперт по созданию вирусных постов для LinkedIn на русском языке.
Твоя задача: создать 5 уникальных постов на тему: "${topic}"

${stylePrompt}

ВАЖНЫЕ ПРАВИЛА:
1. Каждый пост должен быть 150-200 слов
2. Структура поста:
   - hook: первая строка, которая цепляет внимание (1-2 предложения, интригующие)
   - body: основной текст (короткие абзацы по 1-2 предложения, переносы строк между абзацами)
   - cta: призыв к действию в конце (вопрос или призыв)
3. Используй эмодзи уместно (2-5 на пост)
4. Короткие абзацы для лёгкого чтения
5. Все тексты на русском языке
6. Каждый пост должен быть УНИКАЛЬНЫМ, с разным углом зрения

ФОРМАТ ОТВЕТА (строго JSON):
{
  "posts": [
    {
      "hook": "цепляющая первая строка",
      "body": "основной текст поста с переносами строк",
      "cta": "призыв к действию"
    }
  ]
}

Создай ровно 5 постов. Ответ ТОЛЬКО в формате JSON, без markdown блоков.
`;

  try {
    // Генерируем с timeout
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Generation took too long')), 60000)
      ),
    ]);

    const response = result.response;
    const text = response.text();

    // Парсим JSON ответ
    const parsed = parseGeminiResponse(text);
    
    // Валидируем структуру
    if (!parsed.posts || !Array.isArray(parsed.posts) || parsed.posts.length === 0) {
      throw new Error('Invalid response structure: no posts array');
    }

    // Проверяем каждый пост
    const validPosts = parsed.posts.filter(
      (post: Post) => post.hook && post.body && post.cta
    );

    if (validPosts.length === 0) {
      throw new Error('No valid posts in response');
    }

    // Возвращаем максимум 5 постов
    return validPosts.slice(0, 5);

  } catch (error) {
    console.error('[Gemini Error]', error);
    throw error;
  }
}

/**
 * Парсит ответ от Gemini, убирая markdown блоки если есть
 */
function parseGeminiResponse(text: string): GenerateResponse {
  // Убираем возможные markdown блоки ```json ... ```
  let cleanText = text.trim();
  
  // Паттерн для ```json ... ``` или ``` ... ```
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)```/;
  const match = cleanText.match(jsonBlockRegex);
  
  if (match) {
    cleanText = match[1].trim();
  }

  // Пробуем найти JSON объект если ещё не чистый
  if (!cleanText.startsWith('{')) {
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }
  }

  try {
    return JSON.parse(cleanText);
  } catch (e) {
    console.error('[Parse Error] Failed to parse:', cleanText.substring(0, 500));
    throw new Error('Failed to parse Gemini response as JSON');
  }
}
