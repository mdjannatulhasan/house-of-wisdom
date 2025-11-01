import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const updateCategorySchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  menu_order: z.number().int().optional(),
  type: z.enum(['parent', 'child']).optional(),
  parent_id: z.number().int().positive().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        parent: true,
        children: true,
        books: true,
        posts: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch category error:', error);
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
    const data = updateCategorySchema.parse(body);

    const updateData: any = {};
    if (data.title) updateData.title = data.title;
    if (data.slug) updateData.slug = data.slug;
    if (data.menu_order) updateData.menuOrder = data.menu_order;
    if (data.type) updateData.type = data.type;
    if (data.parent_id) updateData.parentId = data.parent_id;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(
      {
        category,
        message: 'Category updated successfully',
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

    console.error('Update category error:', error);
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

    // Soft delete
    await prisma.category.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

