import { useState } from 'react';
import ContactCard from './ContactCard';
import { updateStatus, loadContacts } from '../lib/storage';

const STATUSES = ['New', 'In Progress', 'Won', 'Lost'];

export default function KanbanBoard({ contacts, onChange, onOpen }) {
  const [query, setQuery] = useState('');
  const [dragOver, setDragOver] = useState('');

  const filtered = contacts.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q)
    );
  });

  const handleDrop = (status) => (e) => {
    e.preventDefault();
    setDragOver('');
    const id = e.dataTransfer.getData('text/plain');
    updateStatus(id, status);
    onChange(loadContacts());
  };

  return (
    <div className="kanban-board">
      <div className="kanban-search">
        <input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="kanban-columns">
        {STATUSES.map((status) => (
          <div
            key={status}
            className={`kanban-column ${
              dragOver === status ? 'drag-over' : ''
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(status);
            }}
            onDragLeave={() => setDragOver('')}
            onDrop={handleDrop(status)}
          >
            <h3>{status}</h3>
            {filtered
              .filter((c) => c.status === status)
              .map((c) => (
                <ContactCard key={c.id} contact={c} onOpen={onOpen} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
