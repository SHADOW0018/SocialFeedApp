import React, { useEffect, useState } from 'react';
import FloatingButton from '../shared/FloatingButton';

export default function FeedPage({ token, onLogout }) {
  const [posts, setPosts] = useState([]);

  const load = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (e) { console.error(e); }
  };

  const like = async (id) => {
    try {
      await fetch(`/api/posts/${id}/like`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
      load();
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Feed</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8, borderRadius: 6 }}>
          <div style={{ fontSize: 12, color: '#555' }}>{p.user ? p.user.username : 'Unknown'} · {p.createdAt ? new Date(p.createdAt).toLocaleString() : ''}</div>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: 6 }}>{p.content}</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => like(p.id)}>Like ({p.likes})</button>
          </div>
        </div>
      ))}

      <FloatingButton token={token} onPosted={load} />
    </div>
  );
}
