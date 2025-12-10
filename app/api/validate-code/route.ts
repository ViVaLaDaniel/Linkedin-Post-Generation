import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/validate-code
 * Проверяет PRO код активации
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    // Валидация
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'Код не указан' },
        { status: 400 }
      );
    }

    // Получаем список PRO кодов из env
    const proCodes = process.env.PRO_CODES?.split(',').map(c => c.trim()) || [];
    
    // Проверяем код
    const isValid = proCodes.includes(code.trim().toUpperCase());

    if (isValid) {
      console.log(`[${new Date().toISOString()}] PRO code validated: ${code}`);
      return NextResponse.json({
        valid: true,
        message: 'Код активирован! Теперь у вас безлимитный доступ.'
      });
    }

    return NextResponse.json({
      valid: false,
      error: 'Неверный код. Проверьте правильность ввода.'
    });

  } catch (error) {
    console.error('[Validate Code Error]', error);
    return NextResponse.json(
      { valid: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
