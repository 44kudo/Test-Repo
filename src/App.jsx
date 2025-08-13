import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import ContactModal from './components/ContactModal';
import ContactForm from './components/ContactForm';
import {
  seedIfEmpty,
  resetDemo,
  clearAllContacts,
  saveContacts,
  loadContacts,
} from './lib/storage';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setContacts(seedIfEmpty());
  }, []);

  const handleReset = () => {
    resetDemo();
    setContacts(loadContacts());
  };

  const handleClear = () => {
    clearAllContacts();
    setContacts(loadContacts());
  };

  const openContact = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setSelectedId(null);
    setIsModalOpen(true);
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
    setIsModalOpen(false);
  };

  return (
    <div className="app astro-grid">
      <header className="app-header">
        <div>
          <h1>Astro CRM mini</h1>
          <small>Kanban</small>
        </div>
        <div className="header-actions">
          <button onClick={handleClear}>Clear all</button>
          <button onClick={handleReset}>Reset demo data</button>
          <button onClick={openNew}>New contact</button>
        </div>
      </header>
      <KanbanBoard contacts={contacts} onChange={setContacts} onOpen={openContact} />
      {isModalOpen && selectedId && (
        <ContactModal
          contactId={selectedId}
          onClose={() => setIsModalOpen(false)}
          onDataChange={() => setContacts(loadContacts())}
        />
      )}
      {isModalOpen && selectedId === null && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <ContactForm onAdd={handleCreate} />
          </div>
        </div>
      )}
    </div>
  );
}
