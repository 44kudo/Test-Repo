# Astro CRM mini Mobile

Expo-managed React Native приложение для примера Astro CRM.

## Скрипты
- `npm start` — запуск Expo dev server;
- `npm run android` / `npm run ios` / `npm run web` — открытие приложения на соответствующей платформе.

## Структура
- `App.js` — вход с навигацией (Home, Contact);
- `src/` — экраны, компоненты, хранилище и тема.

## Preview
При любом `push` или Pull Request, затрагивающем `apps/mobile/**`, GitHub Action публикует превью в Expo.
После выполнения job ссылку вида `https://expo.dev/@<user>/astro-crm-mini-mobile` можно увидеть в логах.
Сканируйте QR-код на этой странице в приложении **Expo Go**.
