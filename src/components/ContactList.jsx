export default function ContactList({ contacts }) {
  if (contacts.length === 0) {
    return <p>No contacts</p>;
  }
  return (
    <ul className="contact-list">
      {contacts.map((c) => (
        <li key={c.id} className="contact-item">
          <strong>{c.name}</strong> — {c.phone}
          {c.email && ` | ${c.email}`} | {c.status}
          {c.notes && <p>{c.notes}</p>}
        </li>
      ))}
    </ul>
  );
}
