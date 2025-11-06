import React, { useState } from 'react';

export default function FloatingButton({ token, onPosted }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ content })
    });
    setContent('');
    setOpen(false);
    if (onPosted) onPosted();
  };

  return (
    <>
      {open && (
        <div style={{ position: 'fixed', bottom: 90, right: 20, background: 'white', padding: 10, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          <form onSubmit={submit}>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} style={{ width: 260 }} />
            <div style={{ textAlign: 'right', marginTop: 6 }}>
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
      )}

      <button onClick={() => setOpen(!open)} style={{ position: 'fixed', bottom: 20, right: 20, width: 60, height: 60, borderRadius: '50%', background: '#007bff', color: 'white', fontSize: 30, border: 'none' }}>+</button>
    </>
  );
}
