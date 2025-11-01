import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();

    const userData = await prisma.user.findUnique({
      where: { id: parseInt(user.id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerifiedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const { name, email } = updateProfileSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(user.id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        user: updatedUser,
        message: 'Profile updated successfully',
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

    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth();

    await prisma.user.delete({
      where: { id: parseInt(user.id) },
    });

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

