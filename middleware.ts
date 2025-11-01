import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return null;
    }

    // Check for admin/editor only routes
    const isAdminRoute =
      req.nextUrl.pathname.startsWith('/admin') ||
      req.nextUrl.pathname.startsWith('/dashboard/admin');

    if (isAdminRoute) {
      const userRole = token?.role as string;
      if (!userRole || (userRole !== 'admin' && userRole !== 'editor')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/books/create',
    '/books/:id/edit',
    '/posts/create',
  ],
};

