import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { saveFile, validateFile } from '@/lib/upload';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        chapters: {
          orderBy: { order: 'asc' },
        },
        category: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ book }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch book error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireAuth();

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const categoryId = formData.get('category_id') as string;
    const publicationDate = formData.get('publication_date') as string;
    const coverImage = formData.get('cover_image') as File | null;
    const pdfFile = formData.get('pdf_file') as File | null;
    const price = formData.get('price') as string;

    const updateData: any = {};

    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (categoryId) updateData.categoryId = parseInt(categoryId);
    if (publicationDate) updateData.publicationDate = new Date(publicationDate);
    if (price) updateData.price = parseFloat(price);

    // Handle cover image upload
    if (coverImage && coverImage.size > 0) {
      const coverValidation = validateFile(
        coverImage,
        ['image/jpeg', 'image/png', 'image/jpg'],
        2 * 1024 * 1024
      );

      if (!coverValidation.valid) {
        return NextResponse.json(
          { error: coverValidation.error },
          { status: 400 }
        );
      }

      updateData.coverImage = await saveFile(coverImage, 'uploads/covers');
    }

    // Handle PDF upload
    if (pdfFile && pdfFile.size > 0) {
      const pdfValidation = validateFile(
        pdfFile,
        ['application/pdf'],
        10 * 1024 * 1024
      );

      if (!pdfValidation.valid) {
        return NextResponse.json(
          { error: pdfValidation.error },
          { status: 400 }
        );
      }

      updateData.pdfFile = await saveFile(pdfFile, 'uploads/pdf');
      updateData.type = 'pdf';
    }

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true,
        chapters: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(
      {
        book,
        message: 'Book updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update book error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireAuth();

    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: 'Book deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete book error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

