import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, test, expect } from 'vitest';
import App from '../App';

beforeEach(() => {
  localStorage.clear();
});

test('renders header and form', () => {
  render(<App />);
  expect(screen.getByText(/Mini CRM/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Name/)).toBeInTheDocument();
});

test('adding a contact shows in list', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/Name/), {
    target: { value: 'John' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Phone/), {
    target: { value: '123' },
  });
  fireEvent.click(screen.getByText(/Add/));
  expect(screen.getByText('John')).toBeInTheDocument();
});
