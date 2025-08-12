import { useState } from 'react';

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'New',
    notes: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError('Name and phone are required');
      return;
    }
    setError('');
    onAdd({ ...form, id: Date.now() });
    setForm({ name: '', phone: '', email: '', status: 'New', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {error && <p className="error">{error}</p>}
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
