# Olidort / Olibori Bedachungen — документация проекта

Репозиторий: https://github.com/dkurmaev/olibori  
Деплой: Vercel (см. `vercel.json`)  
Основной домен в sitemap: https://bedachungen.olidort.de

---

## 1) Стек и ключевые технологии

**Frontend**
- React 18
- Vite (dev/build/preview)
- TailwindCSS
- React Router (маршруты страниц)

**UI / UX**
- Framer Motion (анимации)
- animate.css
- Parallax (react-scroll-parallax)
- Sliders: Swiper + react-slick + keen-slider (в проекте есть зависимости, используемые для разных блоков)

**Функциональные интеграции**
- EmailJS (`emailjs-com`) — отправка писем из формы (письмо пользователю + письмо админу)
- Leaflet + react-leaflet — карта “Наш адрес”
- Cookie баннер/настройки — хранение предпочтений в localStorage

**Важно по окружению**
- Node: `22.x` (указано в `package.json` и в настройках Vercel)

---

## 2) Запуск dev-сервера (локально)

### 2.1 Установка зависимостей
```bash
npm install
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

npm run dev
npm run build
npm run preview