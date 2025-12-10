'use client';

import { ReactNode } from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  onButtonClick: () => void;
  isPro?: boolean;
  badge?: string;
}

/**
 * Переиспользуемый компонент карточки тарифа
 */
export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  onButtonClick,
  isPro = false,
  badge,
}: PricingCardProps) {
  return (
    <div 
      className={`
        rounded-3xl p-8 flex flex-col relative overflow-hidden
        ${isPro 
          ? 'bg-gradient-to-br from-linkedin-primary to-linkedin-dark text-white' 
          : 'bg-white border border-gray-200'
        }
      `}
    >
      {/* Бейдж если есть */}
      {badge && (
        <div className={`
          absolute top-6 right-6 px-3 py-1 rounded-full text-sm font-medium
          ${isPro ? 'bg-white/20 backdrop-blur-sm' : 'bg-linkedin-primary/10 text-linkedin-primary'}
        `}>
          {badge}
        </div>
      )}

      {/* Заголовок */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className={isPro ? 'text-white/70' : 'text-gray-500'}>
          {description}
        </p>
      </div>

      {/* Цена */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold">{price}</span>
          <span className={isPro ? 'text-white/70' : 'text-gray-500'}>
            /{period}
          </span>
        </div>
      </div>

      {/* Список функций */}
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className={`flex items-center gap-3 ${!feature.included && !isPro ? 'text-gray-400' : ''}`}
          >
            <div className={`
              w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
              ${isPro 
                ? 'bg-white/20' 
                : feature.included 
                  ? 'bg-green-100' 
                  : 'bg-gray-100'
              }
            `}>
              {feature.included ? (
                <svg className={`w-3 h-3 ${isPro ? 'text-white' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* Кнопка */}
      <button
        onClick={onButtonClick}
        className={`
          w-full py-4 rounded-full text-center font-semibold transition-all
          ${isPro 
            ? 'bg-white text-linkedin-primary hover:bg-gray-100' 
            : 'border-2 border-gray-200 hover:bg-gray-50'
          }
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}
