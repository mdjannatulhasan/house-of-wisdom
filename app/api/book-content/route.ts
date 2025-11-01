import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const createBookContentSchema = z.object({
  chapter_id: z.number().int().positive(),
  content: z.string().min(1, 'Content is required'),
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const chapterId = searchParams.get('chapter_id');

    if (chapterId) {
      const contents = await prisma.bookContent.findMany({
        where: { chapterId: parseInt(chapterId) },
        include: {
          chapter: true,
        },
      });
      return NextResponse.json(contents, { status: 200 });
    }

    const contents = await prisma.bookContent.findMany({
      include: {
        chapter: {
          include: {
            book: true,
          },
        },
      },
    });

    return NextResponse.json(contents, { status: 200 });
  } catch (error: any) {
    console.error('Fetch book content error:', error);
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
    const { chapter_id, content } = createBookContentSchema.parse(body);

    const bookContent = await prisma.bookContent.create({
      data: {
        chapterId: chapter_id,
        content,
      },
      include: {
        chapter: true,
      },
    });

    return NextResponse.json(
      {
        bookContent,
        message: 'Book content created successfully',
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

    console.error('Create book content error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

