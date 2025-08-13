import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, test, expect } from 'vitest';
import App from '../App';
import { loadContacts } from '../lib/storage';

beforeEach(() => {
  localStorage.clear();
});

test('renders header and columns', () => {
  render(<App />);
  expect(screen.getByText(/Astro CRM mini/)).toBeInTheDocument();
  const headings = screen.getAllByRole('heading', { level: 3 });
  const texts = headings.map((h) => h.textContent);
  expect(texts).toEqual(
    expect.arrayContaining(['New', 'In Progress', 'Won', 'Lost'])
  );
});

test('task modal flow updates card counter', () => {
  render(<App />);
  const contact = loadContacts()[0];
  fireEvent.click(screen.getByText(contact.name));
  const input = screen.getByPlaceholderText('New task…');
  expect(input).toBeInTheDocument();
  fireEvent.change(input, {
    target: { value: 'Call' },
  });
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Call')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '×' }));
  expect(screen.getByText('1/1 tasks')).toBeInTheDocument();
});

