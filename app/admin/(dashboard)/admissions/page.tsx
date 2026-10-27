import { sql } from '@/app/lib/db';
import { DeleteLeadButton } from '../../_components/AdminLeadsActions';

type EnquiryRow = {
  id: number;
  candidate_name: string;
  class_name: string;
  parent_name: string;
  email: string | null;
  phone: string;
  school: string | null;
  message: string | null;
  created_at: string;
};

async function getEnquiries(): Promise<EnquiryRow[]> {
  const items = await sql`SELECT * FROM admission_enquiries ORDER BY created_at DESC`;
  return items as unknown as EnquiryRow[];
}

export default async function AdminAdmissionsPage() {
  let items: EnquiryRow[] = [];
  let dbError = false;

  try {
    items = await getEnquiries();
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
  };

  return (
    <div style={styles.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={styles.title}>Admission Enquiries</h2>
          <p style={styles.badge}>{items.length} total enquiries</p>
        </div>
      </div>

      {dbError && (
        <div style={styles.alert}>
          ⚠️ Could not connect to database, or tables don&apos;t exist yet. Run the migration from the Contact Messages page first, then refresh.
        </div>
      )}

      {items.length === 0 && !dbError ? (
        <div style={styles.empty}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <p style={{ fontWeight: 700, fontSize: '1.125rem', color: '#333' }}>No enquiries yet</p>
        </div>
      ) : items.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Parent</th>
              <th style={styles.th}>Candidate</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Grade</th>
              <th style={styles.th}>School</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Received</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ ...styles.td, fontWeight: 600, color: '#010e3a' }}>{item.parent_name}</td>
                <td style={styles.td}>{item.candidate_name}</td>
                <td style={styles.td}>
                  <div><a href={`tel:${item.phone}`} style={{ color: '#034ea2', textDecoration: 'none' }}>{item.phone}</a></div>
                  {item.email && <div style={{ color: '#888', fontSize: '0.75rem' }}>{item.email}</div>}
                </td>
                <td style={styles.td}>{item.class_name}</td>
                <td style={styles.td}>{item.school || '—'}</td>
                <td style={{ ...styles.td, maxWidth: '260px' }}>{item.message || '—'}</td>
                <td style={{ ...styles.td, whiteSpace: 'nowrap', color: '#aaa', fontSize: '0.8rem' }}>
                  {new Date(item.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={styles.td}>
                  <DeleteLeadButton id={item.id} endpoint="/api/admissions" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
