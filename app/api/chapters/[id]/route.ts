import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const updateChapterSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  order: z.number().int().positive().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const chapter = await prisma.chapter.findUnique({
      where: { id: parseInt(id) },
      include: {
        book: true,
        bookContents: true,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ chapter }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch chapter error:', error);
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

    const body = await req.json();
    const data = updateChapterSchema.parse(body);

    const chapter = await prisma.chapter.update({
      where: { id: parseInt(id) },
      data,
      include: {
        book: true,
      },
    });

    return NextResponse.json(
      {
        chapter,
        message: 'Chapter updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Update chapter error:', error);
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

    await prisma.chapter.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: 'Chapter deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete chapter error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

