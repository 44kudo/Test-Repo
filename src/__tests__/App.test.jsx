import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, test, expect } from 'vitest';
import App from '../App';
import { loadContacts } from '../lib/storage';

beforeEach(() => {
  localStorage.clear();
});

test('renders header and columns', () => {
  render(<App />);
  expect(screen.getByText(/Mini CRM/)).toBeInTheDocument();
  const headings = screen.getAllByRole('heading', { level: 3 });
  const texts = headings.map((h) => h.textContent);
  expect(texts).toEqual(
    expect.arrayContaining(['New', 'In Progress', 'Won', 'Lost'])
  );
});

test('adding a task via ContactModal updates storage', () => {
  render(<App />);
  const contact = loadContacts()[0];
  fireEvent.click(screen.getByText(contact.name));
  fireEvent.change(screen.getByPlaceholderText(/Task title/), {
    target: { value: 'Call' },
  });
  fireEvent.click(screen.getByText('Add'));
  const updated = loadContacts().find((c) => c.id === contact.id);
  expect(updated.tasks.length).toBe(1);
});
