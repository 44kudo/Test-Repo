import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadContacts,
  saveContacts,
  seedIfEmpty,
  resetDemo,
} from '../lib/storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads contacts', () => {
    const contacts = [{ id: 1, name: 'Test' }];
    saveContacts(contacts);
    expect(loadContacts()).toEqual(contacts);
  });

  it('seedIfEmpty seeds demo contacts', () => {
    const seeded = seedIfEmpty();
    expect(seeded.length).toBe(3);
    expect(loadContacts().length).toBe(3);
  });

  it('resetDemo restores demo contacts', () => {
    saveContacts([{ id: 99, name: 'X' }]);
    const reset = resetDemo();
    expect(reset.length).toBe(3);
    expect(loadContacts().length).toBe(3);
  });
});
