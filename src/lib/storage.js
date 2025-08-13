const KEY = 'mini-crm/contacts';

const demoContacts = [
  {
    id: '1',
    name: 'Alice',
    phone: '123-456',
    email: 'alice@example.com',
    status: 'New',
    notes: 'First contact',
    tasks: [],
  },
  {
    id: '2',
    name: 'Bob',
    phone: '555-123',
    email: 'bob@example.com',
    status: 'In Progress',
    notes: '',
    tasks: [],
  },
  {
    id: '3',
    name: 'Carol',
    phone: '987-654',
    email: 'carol@example.com',
    status: 'Won',
    notes: '',
    tasks: [],
  },
];

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ??
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export function loadContacts() {
  const raw = localStorage.getItem(KEY);
  let contacts = raw ? JSON.parse(raw) : [];
  let changed = false;
  contacts = contacts.map((c) => {
    if (!c.id) {
      c.id = makeId();
      changed = true;
    }
    if (!Array.isArray(c.tasks)) {
      c.tasks = [];
      changed = true;
    }
    return c;
  });
  if (changed) saveContacts(contacts);
  return contacts;
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

export function getById(id) {
  return loadContacts().find((c) => c.id === id);
}

export function updateStatus(id, newStatus) {
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    contact.status = newStatus;
    saveContacts(contacts);
  }
  return contact;
}

export function addTask(contactId, { title, dueDate }) {
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return null;
  const task = {
    id: makeId(),
    title,
    dueDate: dueDate || '',
    done: false,
    createdAt: new Date().toISOString(),
  };
  contact.tasks.push(task);
  saveContacts(contacts);
  return task;
}

export function toggleTaskDone(contactId, taskId) {
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return null;
  const task = contact.tasks.find((t) => t.id === taskId);
  if (task) {
    task.done = !task.done;
    saveContacts(contacts);
  }
  return task;
}
