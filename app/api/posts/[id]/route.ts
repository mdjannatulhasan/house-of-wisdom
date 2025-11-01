import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, getCurrentUser } from '@/lib/session';
import { z } from 'zod';

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  category_id: z.number().int().positive().optional(),
  status: z.enum(['draft', 'published', 'pending']).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: true,
        comments: {
          where: { deletedAt: null, parentId: null },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            replies: {
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
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get related posts
    const relatedPosts = await prisma.post.findMany({
      where: {
        id: { not: parseInt(id) },
        categoryId: post.categoryId,
        deletedAt: null,
        status: 'published',
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
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ post, relatedPosts }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch post error:', error);
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
    const user = await requireAuth();

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check authorization
    if (
      post.userId !== parseInt(user.id) &&
      user.role !== 'admin' &&
      user.role !== 'editor'
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const data = updatePostSchema.parse(body);

    const updateData: any = {};
    if (data.title) {
      updateData.title = data.title;
      updateData.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    if (data.body) updateData.body = data.body;
    if (data.category_id) updateData.categoryId = data.category_id;
    if (data.status) updateData.status = data.status;

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: updateData,
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
        post: updatedPost,
        message: 'Post updated successfully',
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

    console.error('Update post error:', error);
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
    const user = await requireAuth();

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check authorization
    if (
      post.userId !== parseInt(user.id) &&
      user.role !== 'admin' &&
      user.role !== 'editor'
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Soft delete
    await prisma.post.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

