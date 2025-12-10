import Generator from '@/components/Generator';
import { Sparkles, Zap, Target, Copy, Clock } from 'lucide-react';

/**
 * Главная страница приложения
 * Hero секция + генератор постов + преимущества
 */
export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero секция */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 bg-linkedin-primary/10 text-linkedin-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>

          {/* Заголовок */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Создавайте{' '}
            <span className="gradient-text">вирусные посты</span>
            <br />
            для LinkedIn за секунды
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI генерирует 5 уникальных вариантов постов на любую тему. 
            Выбирайте стиль, получайте результат, копируйте одним кликом.
          </p>

          {/* Статистика */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-linkedin-primary">5</div>
              <div className="text-sm text-gray-500">вариантов за раз</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-linkedin-primary">5</div>
              <div className="text-sm text-gray-500">стилей на выбор</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-linkedin-primary">~15с</div>
              <div className="text-sm text-gray-500">время генерации</div>
            </div>
          </div>
        </div>
      </section>

      {/* Генератор постов */}
      <section className="py-8 px-4" id="generator">
        <div className="max-w-4xl mx-auto">
          <Generator />
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают нас?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Преимущество 1 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-linkedin-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-linkedin-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Мгновенная генерация</h3>
              <p className="text-gray-500 text-sm">
                5 уникальных постов за 15 секунд благодаря Google Gemini
              </p>
            </div>

            {/* Преимущество 2 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-linkedin-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-linkedin-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">5 стилей постов</h3>
              <p className="text-gray-500 text-sm">
                Вдохновляющий, образовательный, история успеха, советы, провокационный
              </p>
            </div>

            {/* Преимущество 3 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-linkedin-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Copy className="w-7 h-7 text-linkedin-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Копирование в 1 клик</h3>
              <p className="text-gray-500 text-sm">
                Сразу готово для публикации в LinkedIn
              </p>
            </div>

            {/* Преимущество 4 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-linkedin-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-linkedin-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">5 бесплатных постов/день</h3>
              <p className="text-gray-500 text-sm">
                Пробуйте без регистрации и оплаты
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-linkedin-primary to-linkedin-dark rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Готовы создать свой первый пост?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Начните прямо сейчас — это бесплатно. Введите тему и получите 5 вариантов постов.
          </p>
          <a 
            href="#generator" 
            className="inline-flex items-center gap-2 bg-white text-linkedin-primary font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Попробовать бесплатно
          </a>
        </div>
      </section>
    </div>
  );
}
