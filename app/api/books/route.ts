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

    if (json === 'true') {
      return NextResponse.json({ books }, { status: 200 });
    }

    return NextResponse.json({ books }, { status: 200 });
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
    if (!title || !author || !categoryId || !publicationDate || !coverImage) {
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

    // Create book
    const book = await prisma.book.create({
      data: {
        title,
        author,
        categoryId: parseInt(categoryId),
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

