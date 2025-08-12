# Mini CRM — Sprint 1

Простой учебный проект на React + Vite.

## Возможности
- список контактов с поиском и фильтром по статусу;
- добавление контакта через форму (имя и телефон обязательны);
- хранение данных в `localStorage` с демо-данными;
- кнопка сброса демо-данных.

## Запуск локально
```bash
npm install
npm run dev
```
Приложение откроется на `http://localhost:5173/`.

Тесты и проверка стиля:
```bash
npm test
npm run lint
```

## GitHub Pages
Сборка и деплой выполняются GitHub Actions.
Чтобы включить Pages:
1. Откройте **Settings → Pages**.
2. В разделе *Build and deployment* выберите **GitHub Actions**.
После пуша в `main` сайт будет доступен по адресу
`https://<username>.github.io/<repo>/`.
