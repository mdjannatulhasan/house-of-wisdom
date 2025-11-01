import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import crypto from 'crypto';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { message: 'If the email exists, a reset link will be sent' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Store reset token
    await prisma.passwordResetToken.upsert({
      where: { email },
      create: {
        email,
        token: resetToken,
      },
      update: {
        token: resetToken,
        createdAt: new Date(),
      },
    });

    // In production, send email here
    // For now, just return the token (remove this in production)
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    return NextResponse.json(
      {
        message: 'Password reset link sent to email',
        resetUrl, // Remove this in production
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

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

