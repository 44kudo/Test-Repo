import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  dueDate?: string;
  done: boolean;
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  status: string;
  tasks: Task[];
};

const CONTACTS_KEY = 'astro-crm/contacts';
const SEEDED_KEY = 'astro-crm/seeded';

const demoContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice',
    phone: '123-456',
    status: 'New',
    tasks: [],
  },
  {
    id: '2',
    name: 'Bob',
    phone: '555-123',
    status: 'In Progress',
    tasks: [],
  },
  {
    id: '3',
    name: 'Carol',
    phone: '987-654',
    status: 'Won',
    tasks: [],
  },
];

const makeId = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export async function loadContacts(): Promise<Contact[]> {
  const raw = await AsyncStorage.getItem(CONTACTS_KEY);
  let contacts: Contact[] = raw ? JSON.parse(raw) : [];
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
  if (changed) await saveContacts(contacts);
  return contacts;
}

export async function saveContacts(next: Contact[]): Promise<void> {
  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(next));
}

export async function seedIfEmpty(): Promise<Contact[]> {
  const existing = await loadContacts();
  const seeded = await AsyncStorage.getItem(SEEDED_KEY);
  if (existing.length === 0 && seeded !== '1') {
    await AsyncStorage.setItem(SEEDED_KEY, '1');
    await saveContacts(demoContacts);
    return demoContacts;
  }
  return existing;
}

export async function clearAllContacts(): Promise<void> {
  await saveContacts([]);
  await AsyncStorage.setItem(SEEDED_KEY, '1');
}

export async function resetDemo(): Promise<Contact[]> {
  await AsyncStorage.removeItem(SEEDED_KEY);
  await saveContacts(demoContacts);
  return demoContacts;
}

export async function getById(id: string): Promise<Contact | undefined> {
  const contacts = await loadContacts();
  return contacts.find((c) => c.id === id);
}

export async function addTask(contactId: string, task: { title: string; dueDate?: string }): Promise<Task | null> {
  const contacts = await loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return null;
  const newTask: Task = { id: makeId(), title: task.title, dueDate: task.dueDate, done: false };
  contact.tasks.push(newTask);
  await saveContacts(contacts);
  return newTask;
}

export async function toggleTaskDone(contactId: string, taskId: string): Promise<void> {
  const contacts = await loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  const task = contact?.tasks.find((t) => t.id === taskId);
  if (task) {
    task.done = !task.done;
    await saveContacts(contacts);
  }
}

export async function updateTask(contactId: string, taskId: string, patch: Partial<Task>): Promise<void> {
  const contacts = await loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  const task = contact?.tasks.find((t) => t.id === taskId);
  if (task) {
    Object.assign(task, patch);
    await saveContacts(contacts);
  }
}

export async function deleteTask(contactId: string, taskId: string): Promise<void> {
  const contacts = await loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    contact.tasks = contact.tasks.filter((t) => t.id !== taskId);
    await saveContacts(contacts);
  }
}

export async function updateStatus(id: string, status: string): Promise<void> {
  const contacts = await loadContacts();
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    contact.status = status;
    await saveContacts(contacts);
  }
}
