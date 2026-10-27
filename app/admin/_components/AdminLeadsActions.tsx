'use client';

export function DeleteLeadButton({ id, endpoint }: { id: number; endpoint: string }) {
  async function handleDelete() {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
    window.location.reload();
  }
  return (
    <button
      onClick={handleDelete}
      style={{ padding: '0.375rem 0.875rem', background: '#fee2e2', color: '#a3123f', border: 'none', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
    >
      Delete
    </button>
  );
}

export function MigrateButton({ style }: { style: React.CSSProperties }) {
  async function handleMigrate() {
    const res = await fetch('/api/admin/migrate', { method: 'POST' });
    const data = await res.json();
    alert(data.message || data.error || 'Done');
    window.location.reload();
  }
  return (
    <button onClick={handleMigrate} style={style}>
      🗄️ Run Migration
    </button>
  );
}
