/** @type {import('next').NextConfig} */
const nextConfig = {
  // Base path для работы на поддиректории /linkedin
  // Раскомментируй для локальной разработки без префикса
  basePath: '/linkedin',
  assetPrefix: '/linkedin',
  
  // Добавляем trailing slash для консистентности URL
  trailingSlash: true,
  
  // Отключаем строгий режим для production
  reactStrictMode: true,
  
  // Настройки для production
  poweredByHeader: false,
};

module.exports = nextConfig;

