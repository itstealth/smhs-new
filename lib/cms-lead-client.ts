// lib/cms-lead-client.ts
//
// Browser side of the CMS copy for forms that post straight to a Google
// Sheet. Fire-and-forget: it never delays or fails the form, and `keepalive`
// lets the request finish even as the page navigates to the thank-you page.
export type CmsLeadCopy = {
  formType?: 'enquiry' | 'contact' | 'admission-enquiry';
  formName?: string;
  name?: string;
  phone?: string;
  email?: string;
  studentName?: string;
  className?: string;
  message?: string;
  details?: Record<string, string>;
};

export function copyLeadToCms(lead: CmsLeadCopy): void {
  try {
    void fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* never let the CMS copy affect the form */
  }
}
