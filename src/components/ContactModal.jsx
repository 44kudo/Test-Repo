import { useEffect, useState } from 'react';
import {
  addTask,
  toggleTaskDone,
  getById,
  loadContacts,
} from '../lib/storage';

export default function ContactModal({ contact, onClose, onCreate, onChange }) {
  const isNew = !contact.id;
  const [form, setForm] = useState(contact);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDue, setTaskDue] = useState('');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const refresh = () => {
    if (!isNew) {
      const fresh = getById(contact.id);
      setForm(fresh);
      onChange(loadContacts());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    onClose();
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    addTask(form.id, { title: taskTitle, dueDate: taskDue });
    setTaskTitle('');
    setTaskDue('');
    refresh();
  };

  const handleToggle = (taskId) => {
    toggleTaskDone(form.id, taskId);
    refresh();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {isNew ? (
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <button type="submit">Create</button>
          </form>
        ) : (
          <div className="contact-details">
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Phone:</strong> {form.phone}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Status:</strong> {form.status}
            </p>
            <p>
              <strong>Notes:</strong> {form.notes}
            </p>
            <div className="tasks-block">
              <h4>Tasks</h4>
              <ul>
                {form.tasks.map((t) => (
                  <li key={t.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => handleToggle(t.id)}
                      />
                      {t.title}
                      {t.dueDate && <small> ({t.dueDate})</small>}
                    </label>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleAddTask} className="task-form">
                <input
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <input
                  type="date"
                  value={taskDue}
                  onChange={(e) => setTaskDue(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
