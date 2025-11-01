import { NextRequest, NextResponse } from 'next/server';
import { hash, compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { z } from 'zod';

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const { currentPassword, newPassword } = updatePasswordSchema.parse(body);

    // Get current user with password
    const userData = await prisma.user.findUnique({
      where: { id: parseInt(user.id) },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isValid = await compare(currentPassword, userData.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: parseInt(user.id) },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: 'Password updated successfully' },
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

