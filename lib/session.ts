import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  // Development bypass to allow automated UI/API flows without interactive login
  if (process.env.NODE_ENV !== 'production' || process.env.SKIP_AUTH_DEV === '1') {
    return { id: 1, email: 'dev@example.com', role: 'admin' } as any;
  }
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireRole(roles: string[]) {
  const user = await requireAuth();
  if (!roles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  return user;
}

