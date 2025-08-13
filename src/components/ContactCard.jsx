export default function ContactCard({ contact, onOpen }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', contact.id);
  };

  const statusClass = `is-${contact.status.replace(/\s/g, '')}`;

  return (
    <div
      className={`contact-card ${statusClass}`}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onOpen(contact.id)}
    >
      <div className="cc-header">
        <span className="cc-name">{contact.name}</span>
        <span className="cc-status">{contact.status}</span>
      </div>
      <div className="cc-phone">{contact.phone}</div>
      <div className="cc-tasks">
        {contact.tasks.filter((t) => !t.done).length}/{contact.tasks.length} tasks
      </div>
      {contact.notes && <div className="cc-notes">{contact.notes}</div>}
    </div>
  );
}
