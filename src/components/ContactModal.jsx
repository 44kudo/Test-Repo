import { useEffect, useState } from 'react';
import {
  getById,
  getTasks,
  addTask,
  toggleTaskDone,
  updateTask,
  deleteTask,
} from '../lib/storage';

export default function ContactModal({ contactId, onClose, onDataChange }) {
  const [contact, setContact] = useState(() => getById(contactId));
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [filter, setFilter] = useState('Open');
  const [editing, setEditing] = useState(null); // taskId
  const [editTitle, setEditTitle] = useState('');

  const refresh = () => {
    setContact(getById(contactId));
    onDataChange();
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask(contactId, { title, dueDate: due });
    setTitle('');
    setDue('');
    refresh();
  };

  const handleToggle = (id) => {
    toggleTaskDone(contactId, id);
    refresh();
  };

  const handleDelete = (id) => {
    deleteTask(contactId, id);
    refresh();
  };

  const startEdit = (task) => {
    setEditing(task.id);
    setEditTitle(task.title);
  };

  const commitEdit = (task) => {
    updateTask(contactId, task.id, { title: editTitle });
    setEditing(null);
    setEditTitle('');
    refresh();
  };

  const tasks = getTasks(contactId).filter((t) => {
    if (filter === 'Open') return !t.done;
    if (filter === 'Done') return t.done;
    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {contact && (
          <div className="contact-details">
            <div className="cm-header">
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <p>Status: {contact.status}</p>
            </div>
            <div className="tasks-block">
              <form onSubmit={handleAdd} className="task-form">
                <input
                  placeholder="New task…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
              <div className="task-filters">
                {['Open', 'All', 'Done'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={filter === f ? 'active' : ''}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <ul className="task-list">
                {tasks.length === 0 && <li>No tasks yet</li>}
                {tasks.map((t) => (
                  <li key={t.id}>
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => handleToggle(t.id)}
                    />
                    {editing === t.id ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => commitEdit(t)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && commitEdit(t)
                        }
                        autoFocus
                      />
                    ) : (
                      <span onDoubleClick={() => startEdit(t)}>{t.title}</span>
                    )}
                    {t.dueDate && (
                      <input
                        type="date"
                        value={t.dueDate}
                        onChange={(e) => {
                          updateTask(contactId, t.id, { dueDate: e.target.value });
                          refresh();
                        }}
                      />
                    )}
                    {!t.dueDate && (
                      <input
                        type="date"
                        onChange={(e) => {
                          updateTask(contactId, t.id, { dueDate: e.target.value });
                          refresh();
                        }}
                      />
                    )}
                    <button
                      type="button"
                      className="task-delete"
                      onClick={() => handleDelete(t.id)}
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

