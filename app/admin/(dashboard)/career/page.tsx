import { sql } from '@/app/lib/db';
import { DeleteLeadButton } from '../../_components/AdminLeadsActions';

type CareerRow = {
  id: number;
  name: string;
  qualification: string | null;
  email: string | null;
  mobile: string;
  experience: string | null;
  subject: string | null;
  board: string | null;
  classes: string | null;
  role_applied: string | null;
  cv_filename: string | null;
  cv_path: string | null;
  created_at: string;
};

async function getApplications(): Promise<CareerRow[]> {
  const items = await sql`SELECT * FROM career_applications ORDER BY created_at DESC`;
  return items as unknown as CareerRow[];
}

export default async function AdminCareerPage() {
  let items: CareerRow[] = [];
  let dbError = false;

  try {
    items = await getApplications();
  } catch {
    dbError = true;
  }

  const styles = {
    page: { padding: '2.5rem', maxWidth: '1200px' } as React.CSSProperties,
    title: { fontSize: '1.75rem', fontWeight: 700, color: '#010e3a', margin: 0 } as React.CSSProperties,
    badge: { fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' } as React.CSSProperties,
    table: { width: '100%', borderCollapse: 'collapse' as const, background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
    th: { padding: '1rem 1.25rem', background: '#f8f9fb', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#888', textAlign: 'left' as const, borderBottom: '1px solid #f0f0f0' },
    td: { padding: '1rem 1.25rem', borderBottom: '1px solid #f8f9fb', verticalAlign: 'middle' as const, fontSize: '0.875rem', color: '#333' },
    empty: { textAlign: 'center' as const, padding: '4rem 2rem', background: 'white', borderRadius: '1rem', color: '#888' },
    alert: { padding: '1rem 1.5rem', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#856404' },
    cvLink: { padding: '0.375rem 0.875rem', background: '#eef4fc', color: '#034ea2', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, marginRight: '0.5rem', display: 'inline-block' } as React.CSSProperties,
  };

  return (
    <div style={styles.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={styles.title}>Career Applications</h2>
          <p style={styles.badge}>{items.length} total applications</p>
        </div>
      </div>

      {dbError && (
        <div style={styles.alert}>
          ⚠️ Could not connect to database, or the <code>career_applications</code> table does not exist yet. Run the migration from the News page first, then refresh.
        </div>
      )}

      {items.length === 0 && !dbError ? (
        <div style={styles.empty}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧑‍🏫</div>
          <p style={{ fontWeight: 700, fontSize: '1.125rem', color: '#333' }}>No applications yet</p>
        </div>
      ) : items.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Qualification</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Experience</th>
              <th style={styles.th}>Subject / Board</th>
              <th style={styles.th}>Role Applied</th>
              <th style={styles.th}>CV</th>
              <th style={styles.th}>Received</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ ...styles.td, fontWeight: 600, color: '#010e3a' }}>{item.name}</td>
                <td style={styles.td}>{item.qualification || '—'}</td>
                <td style={styles.td}>
                  <div>{item.mobile}</div>
                  {item.email && <div style={{ color: '#888', fontSize: '0.75rem' }}>{item.email}</div>}
                </td>
                <td style={styles.td}>{item.experience || '—'}</td>
                <td style={styles.td}>{[item.subject, item.board].filter(Boolean).join(' · ') || '—'}</td>
                <td style={styles.td}>{item.role_applied || '—'}</td>
                <td style={styles.td}>
                  {item.cv_path ? (
                    <a href={item.cv_path} target="_blank" rel="noopener noreferrer" style={styles.cvLink}>View CV</a>
                  ) : '—'}
                </td>
                <td style={{ ...styles.td, whiteSpace: 'nowrap', color: '#aaa', fontSize: '0.8rem' }}>
                  {new Date(item.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={styles.td}>
                  <DeleteLeadButton id={item.id} endpoint="/api/career" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
