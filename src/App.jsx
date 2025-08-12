import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { saveContacts, seedIfEmpty, resetDemo } from './lib/storage';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setContacts(seedIfEmpty());
  }, []);

  const handleAdd = (contact) => {
    const updated = [...contacts, contact];
    setContacts(updated);
    saveContacts(updated);
  };

  const handleReset = () => {
    const demo = resetDemo();
    setContacts(demo);
  };

  const filtered = contacts.filter((c) => {
    const q = query.toLowerCase();
    const matchesQuery =
      c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q);
    const matchesStatus = status ? c.status === status : true;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="container">
      <h1>Mini CRM</h1>
      <div className="controls">
        <input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
        <button onClick={handleReset}>Reset demo data</button>
      </div>
      <ContactForm onAdd={handleAdd} />
      <ContactList contacts={filtered} />
    </div>
  );
}
