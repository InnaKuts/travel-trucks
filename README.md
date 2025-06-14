# TravelTrucks - Camper Rental Service

Фронтенд частина веб-додатку для компанії "TravelTrucks", яка займається орендою кемперів. Додаток включає домашню сторінку, каталог кемперів з фільтрацією та сторінку деталей з формою бронювання.

## 🌐 Live Demo

**🚀 [Переглянути живу демонстрацію](https://travel-trucks-drab.vercel.app/)**

## 🚀 Інструкція по запуску проєкту

### Передумови

- **Node.js** версії 18.0.0 або новішої
- **npm** або **yarn** пакетний менеджер

### Встановлення та запуск

1. **Клонуйте репозиторій:**

   ```bash
   git clone https://github.com/InnaKuts/travel-trucks.git
   cd travel-trucks
   ```

2. **Встановіть залежності:**

   ```bash
   npm install
   # або
   yarn install
   ```

3. **Запустіть проєкт в режимі розробки:**

   ```bash
   npm run dev
   # або
   yarn dev
   ```

4. **Відкрийте браузер** та перейдіть на `http://localhost:5173`

### Доступні скрипти

- `npm run dev` - Запуск в режимі розробки
- `npm run build` - Збірка для продакшн
- `npm run preview` - Попередній перегляд продакшн збірки
- `npm run lint` - Перевірка коду ESLint

## 🏗️ Технології

- **React 19** - UI бібліотека
- **Vite 6** - Інструмент збірки та розробки
- **Redux Toolkit** - Управління станом
- **React Router** - Маршрутизація
- **Axios** - HTTP клієнт для API запитів
- **CSS Modules** - Стилізація компонентів
- **Formik + Yup** - Форми та валідація
- **React Hot Toast** - Сповіщення

## 📁 Структура проєкту

```
src/
├── components/          # Компоненти
│   ├── common/         # Загальні компоненти
│   ├── composite/      # Складені компоненти
│   └── features/       # Функціональні компоненти
├── pages/              # Сторінки додатку
│   ├── Home/          # Домашня сторінка
│   ├── Catalog/       # Каталог кемперів
│   └── Details/       # Деталі кемпера
├── store/              # Redux store
│   └── slices/        # Redux slices
├── services/           # API сервіси
├── styles/            # Глобальні стилі
└── assets/            # Зображення та інші ресурси
```

## 🌐 API

Додаток використовує MockAPI для отримання даних про кемпери:

- **Base URL:** `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io`
- **GET /campers** - Список кемперів з фільтрацією
- **GET /campers/:id** - Деталі конкретного кемпера

## 📱 Функціональність

### Основні сторінки:

- **🏠 Домашня** (`/`) - Головна сторінка з банером
- **📋 Каталог** (`/catalog`) - Список кемперів з фільтрами
- **📖 Деталі** (`/catalog/:id`) - Детальна інформація про кемпер
- **🎨 Дизайн система** (`/design`) - Сторінка для розробників з демонстрацією всіх компонентів UI системи: кнопки, іконки, теги, форми, кольорова палітра та інші елементи дизайну

### Ключові можливості:

- ✅ Фільтрація за локацією, типом та обладнанням
- ✅ Система улюблених з збереженням в localStorage
- ✅ Пагінація з кнопкою "Load More"
- ✅ Відгуки з рейтингом (5 зірок)
- ✅ Форма бронювання з валідацією
- ✅ Галерея зображень з модальним вікном
- ✅ Адаптивний дизайн (desktop, tablet, mobile)

## 🎨 Дизайн

Проєкт реалізовано згідно з наданим макетом із використанням:

- CSS змінних для кольорів та відступів
- Модульних CSS файлів для компонентів
- Адаптивної верстки для всіх пристроїв
- Системи іконок з SVG sprite

## 🔧 Розробка

Для розробки додаткових функцій:

1. Створіть нову гілку: `git checkout -b feature-name`
2. Додайте компоненти в відповідні папки
3. Використовуйте наявні CSS змінні та стилі
4. Додайте необхідні Redux actions/reducers
5. Протестуйте на всіх розмірах екранів
