import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireRole, getCurrentUser } from '@/lib/session';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  category_id: z.number().int().positive(),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
});

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    let where: any = {
      deletedAt: null,
    };

    // If not admin or editor, only show user's own posts
    if (user && user.role !== 'admin' && user.role !== 'editor') {
      where.userId = parseInt(user.id);
    }

    // If no user, only show published posts
    if (!user) {
      where.status = 'published';
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        comments: {
          where: { deletedAt: null },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch posts error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await req.json();
    const { title, body: content, category_id, status } =
      createPostSchema.parse(body);

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const post = await prisma.post.create({
      data: {
        userId: parseInt(user.id),
        title,
        slug,
        body: content,
        categoryId: category_id,
        status: status || 'draft',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: true,
      },
    });

    return NextResponse.json(
      {
        post,
        message: 'Post created successfully',
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

    console.error('Create post error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

