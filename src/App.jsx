import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import ContactModal from './components/ContactModal';
import {
  seedIfEmpty,
  resetDemo,
  saveContacts,
  loadContacts,
  getById,
} from './lib/storage';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setContacts(seedIfEmpty());
  }, []);

  const handleReset = () => {
    resetDemo();
    setContacts(loadContacts());
  };

  const openContact = (id) => {
    const c = getById(id);
    if (c) setActive(c);
  };

  const openNew = () => {
    setActive({
      name: '',
      phone: '',
      email: '',
      status: 'New',
      notes: '',
      tasks: [],
    });
  };

  const handleCreate = (data) => {
    const existing = loadContacts();
    const newContact = {
      ...data,
      id:
        globalThis.crypto?.randomUUID?.() ??
        Math.random().toString(36).slice(2) + Date.now().toString(36),
      tasks: [],
    };
    saveContacts([...existing, newContact]);
    setContacts(loadContacts());
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Mini CRM</h1>
          <small>Kanban</small>
        </div>
        <div className="header-actions">
          <button onClick={handleReset}>Reset demo data</button>
          <button onClick={openNew}>New contact</button>
        </div>
      </header>
      <KanbanBoard contacts={contacts} onChange={setContacts} onOpen={openContact} />
      {active && (
        <ContactModal
          contact={active}
          onClose={() => setActive(null)}
          onCreate={handleCreate}
          onChange={setContacts}
        />
      )}
    </div>
  );
}
