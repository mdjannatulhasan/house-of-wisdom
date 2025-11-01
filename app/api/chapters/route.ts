import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const createChapterSchema = z.object({
  book_id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  order: z.number().int().positive().default(1),
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const bookId = searchParams.get('book_id');

    if (!bookId) {
      return NextResponse.json(
        { error: 'book_id is required' },
        { status: 400 }
      );
    }

    const chapters = await prisma.chapter.findMany({
      where: { bookId: parseInt(bookId) },
      include: {
        bookContents: true,
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(chapters, { status: 200 });
  } catch (error: any) {
    console.error('Fetch chapters error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();

    const body = await req.json();
    const { book_id, title, content, order } = createChapterSchema.parse(body);

    const chapter = await prisma.chapter.create({
      data: {
        bookId: book_id,
        title,
        content: content || '',
        order,
      },
      include: {
        book: true,
      },
    });

    return NextResponse.json(
      {
        chapter,
        message: 'Chapter created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Create chapter error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

