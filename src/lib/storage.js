const KEY = 'mini-crm/contacts';

const demoContacts = [
  {
    id: 1,
    name: 'Alice',
    phone: '123-456',
    email: 'alice@example.com',
    status: 'New',
    notes: 'First contact',
  },
  {
    id: 2,
    name: 'Bob',
    phone: '555-123',
    email: 'bob@example.com',
    status: 'In Progress',
    notes: '',
  },
  {
    id: 3,
    name: 'Carol',
    phone: '987-654',
    email: 'carol@example.com',
    status: 'Won',
    notes: '',
  },
];

export function loadContacts() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveContacts(contacts) {
  localStorage.setItem(KEY, JSON.stringify(contacts));
}

export function seedIfEmpty() {
  const existing = loadContacts();
  if (existing.length === 0) {
    saveContacts(demoContacts);
    return demoContacts;
  }
  return existing;
}

export function resetDemo() {
  saveContacts(demoContacts);
  return demoContacts;
}
