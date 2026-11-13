// app/uploads/career/[file]/route.ts
//
// Serves CVs that applicants uploaded AFTER the site was last built.
//
// The career form saves CVs to public/uploads/career/, but `next start` only
// serves public/ files that existed at build time -- so every CV uploaded
// since the last deploy answered 404, and the CMS "Open CV" link was dead
// until the next rebuild. Files present at build time are still served by
// Next directly (public/ wins over this route); this covers the rest.
//
// Only names the career route itself generates are accepted, so this cannot
// be used to read any other file.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const NAME = /^cv-\d{10,16}-[0-9a-f]{8}\.(pdf|doc|docx)$/;
const TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const match = NAME.exec(file);
  if (!match) return new Response('Not found', { status: 404 });
  try {
    const data = await readFile(path.join(process.cwd(), 'public', 'uploads', 'career', file));
    return new Response(new Uint8Array(data), {
      headers: {
        'Content-Type': TYPES[match[1]],
        'Content-Disposition': `inline; filename="${file}"`,
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
