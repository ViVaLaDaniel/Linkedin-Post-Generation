'use client';

import { useState } from 'react';
import { X, Crown, Loader2, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Модальное окно для покупки и активации PRO
 * Содержит инструкции PayPal и форму активации кода
 */
export default function ProModal({ isOpen, onClose }: ProModalProps) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  // Если модалка закрыта, не рендерим
  if (!isOpen) return null;

  /**
   * Обработчик активации кода
   */
  const handleActivate = async () => {
    if (!code.trim()) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      const response = await fetch('/linkedin/api/validate-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });

      const data = await response.json();
      setValidationResult(data);

      // Если код валидный, сохраняем в localStorage
      if (data.valid) {
        localStorage.setItem('proCode', code.trim().toUpperCase());
      }
    } catch (err) {
      setValidationResult({
        valid: false,
        error: 'Ошибка подключения к серверу',
      });
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Закрытие модалки при клике на overlay
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content p-6 md:p-8 m-4">
        {/* Заголовок */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-linkedin-primary to-linkedin-dark rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Получить PRO</h2>
              <p className="text-sm text-gray-500">Безлимитные генерации за €19/мес</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Инструкция по оплате */}
        <div className="bg-blue-50 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-linkedin-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-linkedin-dark mb-2">
                Как оплатить:
              </h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li>
                  1. Отправьте €19 на PayPal:{' '}
                  <span className="font-mono bg-white px-2 py-0.5 rounded">
                    payment@example.com
                  </span>
                </li>
                <li>
                  2. В комментарии укажите ваш email
                </li>
                <li>
                  3. Получите код активации на почту (обычно до 24 часов)
                </li>
                <li>
                  4. Введите код ниже для активации PRO
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Форма активации */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Код активации
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="PRO-XXXXXX"
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-linkedin-primary focus:border-transparent transition-all font-mono uppercase"
              disabled={isValidating || validationResult?.valid}
            />
            <button
              onClick={handleActivate}
              disabled={!code.trim() || isValidating || validationResult?.valid}
              className="px-6 py-3 bg-linkedin-primary text-white rounded-xl font-medium hover:bg-linkedin-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Проверка...
                </>
              ) : validationResult?.valid ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Готово!
                </>
              ) : (
                'Активировать'
              )}
            </button>
          </div>
        </div>

        {/* Результат валидации */}
        {validationResult && (
          <div className={`
            p-4 rounded-xl flex items-start gap-3 mb-6 animate-fade-in
            ${validationResult.valid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            }
          `}>
            {validationResult.valid ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-700">
                    {validationResult.message}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Обновите страницу чтобы начать использовать PRO
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">
                  {validationResult.error}
                </p>
              </>
            )}
          </div>
        )}

        {/* Преимущества PRO */}
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-3">Что включает PRO:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-linkedin-primary rounded-full" />
              ♾️ Безлимитные генерации постов
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-linkedin-primary rounded-full" />
              🚀 Приоритетная скорость генерации
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-linkedin-primary rounded-full" />
              💬 Поддержка по email
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-linkedin-primary rounded-full" />
              🔓 Без ограничений по IP
            </li>
          </ul>
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
