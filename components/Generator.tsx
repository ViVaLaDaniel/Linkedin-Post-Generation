'use client';

import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import PostCard from './PostCard';
import { STYLE_NAMES } from '@/lib/gemini';

// Типы
interface Post {
  hook: string;
  body: string;
  cta: string;
}

type StyleKey = 'inspirational' | 'educational' | 'success_story' | 'tips' | 'provocative';

// Стили для выбора
const STYLES: { key: StyleKey; emoji: string }[] = [
  { key: 'inspirational', emoji: '✨' },
  { key: 'educational', emoji: '📚' },
  { key: 'success_story', emoji: '🏆' },
  { key: 'tips', emoji: '💡' },
  { key: 'provocative', emoji: '🔥' },
];

// Названия стилей (дублируем для клиента)
const STYLE_LABELS: Record<StyleKey, string> = {
  inspirational: 'Вдохновляющий',
  educational: 'Образовательный',
  success_story: 'История успеха',
  tips: 'Советы',
  provocative: 'Провокационный',
};

/**
 * Компонент генератора постов
 * Включает форму ввода, выбор стиля и отображение результатов
 */
export default function Generator() {
  // Состояния
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<StyleKey>('inspirational');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  /**
   * Обработчик генерации постов
   */
  const handleGenerate = async () => {
    // Валидация
    if (!topic.trim()) {
      setError('Введите тему для поста');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPosts([]);

    try {
      // Получаем PRO код из localStorage если есть
      const proCode = typeof window !== 'undefined' 
        ? localStorage.getItem('proCode') 
        : null;

      // Запрос к API
      const response = await fetch('/linkedin/api/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          style,
          proCode: proCode || undefined,
        }),
      });

      const data = await response.json();

      // Обработка ошибок
      if (!response.ok) {
        setError(data.error || 'Произошла ошибка при генерации');
        if (data.remaining !== undefined) {
          setRemaining(data.remaining);
        }
        return;
      }

      // Успешный результат
      setPosts(data.posts);
      if (data.remaining !== undefined && data.remaining !== Infinity) {
        setRemaining(data.remaining);
      }

    } catch (err) {
      console.error('[Generate Error]', err);
      setError('Не удалось подключиться к серверу. Проверьте интернет-соединение.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Обработка нажатия Enter в поле ввода
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
      {/* Форма ввода */}
      <div className="mb-6">
        <label 
          htmlFor="topic" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          О чём будет пост? 📝
        </label>
        <textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Например: Запустили новую фичу и получили 1000 пользователей за неделю..."
          className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-linkedin-primary focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
          rows={3}
          maxLength={500}
          disabled={isLoading}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Чем подробнее опишете тему, тем лучше результат</span>
          <span>{topic.length}/500</span>
        </div>
      </div>

      {/* Выбор стиля */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Выберите стиль 🎨
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLES.map(({ key, emoji }) => (
            <button
              key={key}
              onClick={() => setStyle(key)}
              disabled={isLoading}
              className={`
                px-4 py-2 rounded-full font-medium transition-all
                ${style === key 
                  ? 'bg-linkedin-primary text-white shadow-md scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {emoji} {STYLE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка генерации */}
      <button
        onClick={handleGenerate}
        disabled={isLoading || !topic.trim()}
        className="w-full btn-linkedin py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Генерирую посты...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Создать 5 вариантов
          </>
        )}
      </button>

      {/* Оставшиеся генерации */}
      {remaining !== null && remaining !== Infinity && (
        <p className="text-center text-sm text-gray-500 mt-3">
          Осталось генераций сегодня: <span className="font-semibold">{remaining}</span>
        </p>
      )}

      {/* Ошибка */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-medium">{error}</p>
            {remaining === 0 && (
              <a 
                href="/linkedin/pricing/" 
                className="inline-block mt-2 text-linkedin-primary hover:underline font-medium"
              >
                Получить PRO за €19/мес →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Лоадер во время генерации */}
      {isLoading && (
        <div className="mt-8 py-12 flex flex-col items-center justify-center animate-pulse">
          <div className="w-16 h-16 border-4 border-linkedin-primary/20 border-t-linkedin-primary rounded-full animate-spin mb-4" />
          <p className="text-gray-500">AI анализирует тему и создаёт уникальные посты...</p>
          <p className="text-sm text-gray-400 mt-2">Обычно это занимает 10-15 секунд</p>
        </div>
      )}

      {/* Результаты */}
      {posts.length > 0 && !isLoading && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              ✅
            </span>
            Готово! 5 вариантов для вас:
          </h3>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={index} className="post-appear">
                <PostCard post={post} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
