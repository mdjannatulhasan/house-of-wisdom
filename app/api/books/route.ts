import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, getCurrentUser } from '@/lib/session';
import { saveFile, validateFile } from '@/lib/upload';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchTerm = searchParams.get('searchTerm') || searchParams.get('title');
    const year = searchParams.get('year');
    const json = searchParams.get('json');

    let where: any = {};

    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    if (year) {
      const yearNum = parseInt(year);
      where.publicationDate = {
        gte: new Date(`${yearNum}-01-01`),
        lte: new Date(`${yearNum}-12-31`),
      };
    }

    const books = await prisma.book.findMany({
      where,
      include: {
        chapters: {
          orderBy: { order: 'asc' },
        },
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format books for frontend
    const formattedBooks = books.map(book => ({
      id: book.id,
      title: book.title,
      cover_image: `/${book.coverImage}`,
      author: book.author,
      genre: book.category?.title || '',
      publication_date: book.publicationDate.toISOString(),
      status: 'active',
      pdf_file: book.pdfFile ? `/${book.pdfFile}` : '',
      type: book.type,
    }));

    return NextResponse.json({ books: formattedBooks, count: formattedBooks.length }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch books error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const categoryId = formData.get('category_id') as string;
    const publicationDate = formData.get('publication_date') as string;
    const coverImage = formData.get('cover_image') as File;
    const pdfFile = formData.get('pdf_file') as File | null;
    const price = formData.get('price') as string;

    // Validate required fields
    if (!title || !author || !publicationDate || !coverImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate cover image
    const coverValidation = validateFile(
      coverImage,
      ['image/jpeg', 'image/png', 'image/jpg'],
      2 * 1024 * 1024 // 2MB
    );

    if (!coverValidation.valid) {
      return NextResponse.json(
        { error: coverValidation.error },
        { status: 400 }
      );
    }

    // Save cover image
    const coverPath = await saveFile(coverImage, 'uploads/covers');

    // Save PDF if provided
    let pdfPath = null;
    if (pdfFile && pdfFile.size > 0) {
      const pdfValidation = validateFile(
        pdfFile,
        ['application/pdf'],
        10 * 1024 * 1024 // 10MB
      );

      if (!pdfValidation.valid) {
        return NextResponse.json(
          { error: pdfValidation.error },
          { status: 400 }
        );
      }

      pdfPath = await saveFile(pdfFile, 'uploads/pdf');
    }

    // Resolve category id (fallback to 'General' if not provided)
    let finalCategoryId: number | null = null;
    if (categoryId) {
      finalCategoryId = parseInt(categoryId);
    } else {
      let general = await prisma.category.findFirst({ where: { title: 'General' } });
      if (!general) {
        general = await prisma.category.create({
          data: { title: 'General', slug: 'general' },
        });
      }
      finalCategoryId = general.id;
    }

    // Create book
    const book = await prisma.book.create({
      data: {
        title,
        author,
        categoryId: finalCategoryId!,
        publicationDate: new Date(publicationDate),
        coverImage: coverPath,
        pdfFile: pdfPath,
        price: price ? parseFloat(price) : null,
        type: pdfPath ? 'pdf' : 'text',
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      {
        book,
        message: 'Book created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

