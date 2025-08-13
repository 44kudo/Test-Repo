import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadContacts,
  saveContacts,
  seedIfEmpty,
  resetDemo,
  addTask,
  toggleTaskDone,
  updateStatus,
} from '../lib/storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('migrates contacts missing id or tasks', () => {
    saveContacts([{ name: 'NoId' }]);
    const loaded = loadContacts();
    expect(loaded[0].id).toBeTruthy();
    expect(Array.isArray(loaded[0].tasks)).toBe(true);
  });

  it('seedIfEmpty seeds demo contacts', () => {
    const seeded = seedIfEmpty();
    expect(seeded.length).toBe(3);
    expect(loadContacts().length).toBe(3);
  });

  it('resetDemo restores demo contacts', () => {
    saveContacts([{ id: '99', name: 'X', tasks: [] }]);
    const reset = resetDemo();
    expect(reset.length).toBe(3);
    expect(loadContacts().length).toBe(3);
  });

  it('addTask and toggleTaskDone work', () => {
    const contacts = seedIfEmpty();
    const firstId = contacts[0].id;
    const task = addTask(firstId, { title: 'Test', dueDate: '' });
    expect(task.title).toBe('Test');
    toggleTaskDone(firstId, task.id);
    const contact = loadContacts().find((c) => c.id === firstId);
    expect(contact.tasks[0].done).toBe(true);
  });

  it('updateStatus updates contact status', () => {
    const contacts = seedIfEmpty();
    const firstId = contacts[0].id;
    updateStatus(firstId, 'Won');
    const contact = loadContacts().find((c) => c.id === firstId);
    expect(contact.status).toBe('Won');
  });
});
