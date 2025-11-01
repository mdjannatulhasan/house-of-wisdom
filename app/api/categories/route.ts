import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const createCategorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  menu_order: z.number().int().default(10),
  type: z.enum(['parent', 'child']).default('parent'),
  parent_id: z.number().int().positive().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        parent: true,
        children: true,
      },
      orderBy: {
        menuOrder: 'asc',
      },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch categories error:', error);
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
    const { title, slug, menu_order, type, parent_id } =
      createCategorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        title,
        slug,
        menuOrder: menu_order,
        type,
        parentId: parent_id,
      },
    });

    return NextResponse.json(
      {
        category,
        message: 'Category created successfully',
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

    console.error('Create category error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

