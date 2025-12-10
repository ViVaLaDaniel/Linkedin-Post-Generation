'use client';

import { useState } from 'react';
import { Copy, Check, Linkedin } from 'lucide-react';

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
 * Отображает hook, body, cta, кнопку копирования и кнопку Share в LinkedIn
 */
export default function PostCard({ post, index }: PostCardProps) {
  const [copied, setCopied] = useState(false);

  // Собираем полный текст поста
  const fullText = `${post.hook}\n\n${post.body}\n\n${post.cta}`;

  /**
   * Копирует пост в буфер обмена
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
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

  /**
   * Открывает LinkedIn с готовым текстом поста
   */
  const handleShareToLinkedIn = () => {
    // Кодируем текст для URL
    const encodedText = encodeURIComponent(fullText);
    // LinkedIn share URL с предзаполненным текстом
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive&text=${encodedText}`;
    // Открываем в новом окне
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  return (
    <div className="post-card p-6 relative group">
      {/* Номер поста */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-linkedin-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
        {index}
      </div>

      {/* Кнопки действий */}
      <div className="absolute top-4 right-4 flex gap-2">
        {/* Кнопка Share в LinkedIn */}
        <button
          onClick={handleShareToLinkedIn}
          className="p-2 rounded-lg transition-all bg-linkedin-primary text-white hover:bg-linkedin-dark opacity-0 group-hover:opacity-100"
          title="Опубликовать в LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>

        {/* Кнопка копирования */}
        <button
          onClick={handleCopy}
          className={`
            p-2 rounded-lg transition-all
            ${copied 
              ? 'bg-green-100 text-green-600' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 opacity-0 group-hover:opacity-100'
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
      </div>

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

      {/* Кнопка Share внизу карточки */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleShareToLinkedIn}
          className="w-full py-3 bg-linkedin-primary text-white rounded-xl font-medium hover:bg-linkedin-dark transition-colors flex items-center justify-center gap-2"
        >
          <Linkedin className="w-5 h-5" />
          Опубликовать в LinkedIn
        </button>
      </div>

      {/* Toast при копировании */}
      {copied && (
        <div className="absolute bottom-20 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
          ✓ Скопировано!
        </div>
      )}
    </div>
  );
}

