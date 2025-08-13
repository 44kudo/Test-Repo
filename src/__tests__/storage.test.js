import { describe, it, expect, beforeEach } from 'vitest';
import {
  seedIfEmpty,
  addTask,
  toggleTaskDone,
  updateTask,
  deleteTask,
  getTasks,
  loadContacts,
} from '../lib/storage';

describe('storage tasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('addTask creates task and toggleTaskDone switches flag', () => {
    const contacts = seedIfEmpty();
    const id = contacts[0].id;
    const task = addTask(id, { title: 'Call', dueDate: '' });
    expect(task.done).toBe(false);
    toggleTaskDone(id, task.id);
    const stored = loadContacts().find((c) => c.id === id);
    expect(stored.tasks[0].done).toBe(true);
  });

  it('updateTask edits fields and deleteTask removes', () => {
    const contacts = seedIfEmpty();
    const id = contacts[0].id;
    const task = addTask(id, { title: 'Call', dueDate: '' });
    updateTask(id, task.id, { title: 'Email', dueDate: '2024-01-01' });
    let stored = loadContacts().find((c) => c.id === id);
    expect(stored.tasks[0].title).toBe('Email');
    expect(stored.tasks[0].dueDate).toBe('2024-01-01');
    deleteTask(id, task.id);
    stored = loadContacts().find((c) => c.id === id);
    expect(stored.tasks.length).toBe(0);
  });

  it('getTasks sorts open by due date then done', () => {
    const contacts = seedIfEmpty();
    const id = contacts[0].id;
    addTask(id, { title: 'b', dueDate: '2024-06-01' });
    addTask(id, { title: 'a', dueDate: '2024-05-01' });
    addTask(id, { title: 'c', dueDate: '' });
    const done = addTask(id, { title: 'd', dueDate: '2024-04-01' });
    toggleTaskDone(id, done.id);
    const list = getTasks(id);
    expect(list.map((t) => t.title)).toEqual(['a', 'b', 'c', 'd']);
  });
});

