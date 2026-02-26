import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getLinkBySlug } from '@/data/links';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const link = await getLinkBySlug(slug);

  if (!link) {
    return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
  }

  redirect(link.originalUrl);
}
