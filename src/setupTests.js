// vitest + RTL правильная инициализация
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// версия matchers для Vitest (не обычный jest-dom)
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// (опционально) если где-то будем расширять expect — он уже импортирован

