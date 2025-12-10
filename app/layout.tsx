import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

// Шрифт Inter для современного вида
const inter = Inter({ subsets: ['latin', 'cyrillic'] });

// Метаданные для SEO
export const metadata: Metadata = {
  title: 'LinkedIn Post Generator | AI-powered Viral Posts',
  description: 'Создавайте вирусные посты для LinkedIn с помощью AI. 5 уникальных вариантов за секунды. Бесплатно!',
  keywords: 'LinkedIn, AI, генератор постов, контент, социальные сети, маркетинг',
  authors: [{ name: 'LinkedIn AI Generator' }],
  openGraph: {
    title: 'LinkedIn Post Generator | AI-powered Viral Posts',
    description: 'Создавайте вирусные посты для LinkedIn с помощью AI',
    type: 'website',
  },
};

/**
 * Корневой layout приложения
 * Включает навигацию и футер
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* Навигация */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Логотип */}
            <Link 
              href="/linkedin/" 
              className="flex items-center gap-2 text-xl font-bold"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-linkedin-primary to-linkedin-dark rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">in</span>
              </div>
              <span className="gradient-text">Post Generator</span>
            </Link>

            {/* Навигационные ссылки */}
            <div className="flex items-center gap-6">
              <Link 
                href="/linkedin/" 
                className="text-gray-600 hover:text-linkedin-primary font-medium transition-colors"
              >
                Генератор
              </Link>
              <Link 
                href="/linkedin/pricing/" 
                className="text-gray-600 hover:text-linkedin-primary font-medium transition-colors"
              >
                Тарифы
              </Link>
              <Link 
                href="/linkedin/pricing/" 
                className="btn-linkedin text-sm py-2 px-4"
              >
                🚀 PRO
              </Link>
            </div>
          </nav>
        </header>

        {/* Основной контент */}
        <main className="min-h-[calc(100vh-140px)]">
          {children}
        </main>

        {/* Футер */}
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2024 LinkedIn Post Generator. Создано с ❤️ и AI</p>
            <p className="mt-2">
              Powered by{' '}
              <a 
                href="https://ai.google.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-linkedin-primary hover:underline"
              >
                Google Gemini
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
