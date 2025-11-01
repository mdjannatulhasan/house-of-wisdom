import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // Find reset token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token is expired (1 hour)
    const tokenAge = Date.now() - resetToken.createdAt.getTime();
    if (tokenAge > 3600000) {
      await prisma.passwordResetToken.delete({
        where: { email: resetToken.email },
      });
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(password, 12);

    // Update user password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // Delete reset token
    await prisma.passwordResetToken.delete({
      where: { email: resetToken.email },
    });

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

