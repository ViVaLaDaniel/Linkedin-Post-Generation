'use client';

import { useState } from 'react';
import { Check, X, Sparkles, Crown } from 'lucide-react';
import ProModal from '@/components/ProModal';

/**
 * Страница тарифов
 * FREE vs PRO сравнение
 */
export default function PricingPage() {
  // Состояние модального окна PRO
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-16 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linkedin-primary/10 text-linkedin-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Простые и прозрачные тарифы
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Выберите свой план
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Начните бесплатно, переходите на PRO когда будете готовы
          </p>
        </div>

        {/* Карточки тарифов */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* FREE тариф */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">FREE</h2>
              <p className="text-gray-500">Для начала работы</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">€0</span>
                <span className="text-gray-500">/месяц</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>5 генераций в день</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>5 стилей постов</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>5 вариантов за генерацию</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>Копирование в 1 клик</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="w-3 h-3 text-gray-400" />
                </div>
                <span>Приоритетная поддержка</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="w-3 h-3 text-gray-400" />
                </div>
                <span>Без лимитов</span>
              </li>
            </ul>

            <a 
              href="/linkedin/" 
              className="w-full py-4 border-2 border-gray-200 rounded-full text-center font-semibold hover:bg-gray-50 transition-colors"
            >
              Текущий план
            </a>
          </div>

          {/* PRO тариф */}
          <div className="bg-gradient-to-br from-linkedin-primary to-linkedin-dark rounded-3xl p-8 text-white flex flex-col relative overflow-hidden">
            {/* Популярный бейдж */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              ⭐ Популярный
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">PRO</h2>
              <p className="text-white/70">Для активных пользователей</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">€19</span>
                <span className="text-white/70">/месяц</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>♾️ Безлимитные генерации</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>5 стилей постов</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>5 вариантов за генерацию</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Копирование в 1 клик</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Приоритетная поддержка</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Без ограничений по IP</span>
              </li>
            </ul>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-white text-linkedin-primary rounded-full text-center font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Получить PRO
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Часто задаваемые вопросы
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Как работает FREE план?</h3>
              <p className="text-gray-600">
                Вы получаете 5 бесплатных генераций в день. Каждая генерация создаёт 5 уникальных вариантов постов. 
                Лимит сбрасывается каждый день в полночь.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Как активировать PRO?</h3>
              <p className="text-gray-600">
                После оплаты через PayPal вы получите код активации. Введите его в форму активации, 
                и PRO статус будет применён мгновенно.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Могу ли я отменить подписку?</h3>
              <p className="text-gray-600">
                Да, вы можете отменить подписку в любой момент через PayPal. 
                PRO доступ сохранится до конца оплаченного периода.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Какие способы оплаты?</h3>
              <p className="text-gray-600">
                Мы принимаем оплату через PayPal. Вы можете использовать карту или баланс PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно PRO */}
      <ProModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
