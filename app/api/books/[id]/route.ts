import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { saveFile, validateFile } from '@/lib/upload';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        category: true,
        chapters: {
          include: {
            bookContents: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(book, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const formData = await req.formData();

    const title = (formData.get('title') as string) || undefined;
    const author = (formData.get('author') as string) || undefined;
    const categoryIdStr = (formData.get('category_id') as string) || undefined;
    const publicationDateStr =
      (formData.get('publication_date') as string) || undefined;
    const priceStr = (formData.get('price') as string) || undefined;
    const coverImage = formData.get('cover_image') as File | null;
    const pdfFile = formData.get('pdf_file') as File | null;

    const data: any = {};
    if (title) data.title = title;
    if (author) data.author = author;
    if (categoryIdStr) data.categoryId = parseInt(categoryIdStr);
    if (publicationDateStr)
      data.publicationDate = new Date(publicationDateStr);
    if (priceStr) data.price = parseFloat(priceStr);

    if (coverImage && coverImage.size > 0) {
      const ok = validateFile(coverImage, ['image/jpeg', 'image/png', 'image/jpg'], 2 * 1024 * 1024);
      if (!ok.valid)
        return NextResponse.json({ error: ok.error }, { status: 400 });
      const coverPath = await saveFile(coverImage, 'uploads/covers');
      data.coverImage = coverPath;
    }

    if (pdfFile && pdfFile.size > 0) {
      const ok = validateFile(pdfFile, ['application/pdf'], 10 * 1024 * 1024);
      if (!ok.valid)
        return NextResponse.json({ error: ok.error }, { status: 400 });
      const pdfPath = await saveFile(pdfFile, 'uploads/pdf');
      data.pdfFile = pdfPath;
      data.type = 'pdf';
    }

    const updated = await prisma.book.update({ where: { id }, data });
    return NextResponse.json({ book: updated }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

