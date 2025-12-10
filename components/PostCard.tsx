'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Типы
interface Post {
  hook: string;
  body: string;
  cta: string;
}

interface PostCardProps {
  post: Post;
  index: number;
}

/**
 * Компонент карточки поста
 * Отображает hook, body, cta и кнопку копирования
 */
export default function PostCard({ post, index }: PostCardProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Копирует пост в буфер обмена
   */
  const handleCopy = async () => {
    // Собираем полный текст поста
    const fullText = `${post.hook}\n\n${post.body}\n\n${post.cta}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);

      // Сбрасываем состояние через 2 секунды
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="post-card p-6 relative group">
      {/* Номер поста */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-linkedin-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
        {index}
      </div>

      {/* Кнопка копирования */}
      <button
        onClick={handleCopy}
        className={`
          absolute top-4 right-4 p-2 rounded-lg transition-all
          ${copied 
            ? 'bg-green-100 text-green-600' 
            : 'bg-gray-100 text-gray-500 hover:bg-linkedin-primary hover:text-white opacity-0 group-hover:opacity-100'
          }
        `}
        title={copied ? 'Скопировано!' : 'Копировать пост'}
      >
        {copied ? (
          <Check className="w-5 h-5" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>

      {/* Hook - первая цепляющая строка */}
      <div className="mb-4">
        <span className="text-xs text-linkedin-primary font-medium uppercase tracking-wide">
          Хук
        </span>
        <p className="text-lg font-semibold text-gray-900 mt-1 leading-relaxed">
          {post.hook}
        </p>
      </div>

      {/* Body - основной текст */}
      <div className="mb-4">
        <span className="text-xs text-linkedin-primary font-medium uppercase tracking-wide">
          Основной текст
        </span>
        <div className="text-gray-700 mt-1 whitespace-pre-line leading-relaxed">
          {post.body}
        </div>
      </div>

      {/* CTA - призыв к действию */}
      <div className="pt-4 border-t border-gray-100">
        <span className="text-xs text-linkedin-primary font-medium uppercase tracking-wide">
          Призыв к действию
        </span>
        <p className="text-gray-800 font-medium mt-1">
          {post.cta}
        </p>
      </div>

      {/* Подсказка при наведении */}
      <div className={`
        absolute bottom-4 right-4 text-sm text-gray-400
        transition-opacity duration-200
        ${copied ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
      `}>
        Нажмите для копирования →
      </div>

      {/* Toast при копировании */}
      {copied && (
        <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
          ✓ Скопировано!
        </div>
      )}
    </div>
  );
}
