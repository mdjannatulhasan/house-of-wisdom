import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import MainLayout from '@/components/layouts/MainLayout';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const isAdmin = session.user.role === 'admin';
  const isEditor = session.user.role === 'editor';

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome, {session.user.name}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <Link
            href="/profile"
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
            <p className="text-gray-600">Manage your account settings</p>
          </Link>

          {/* Books */}
          {(isAdmin || isEditor) && (
            <Link
              href="/dashboard/books/create"
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <h2 className="text-xl font-semibold mb-2">Add Book</h2>
              <p className="text-gray-600">Upload a new book to the library</p>
            </Link>
          )}

          {/* Posts */}
          {(isAdmin || isEditor) && (
            <Link
              href="/dashboard/posts/create"
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <h2 className="text-xl font-semibold mb-2">Create Post</h2>
              <p className="text-gray-600">Write a new blog post</p>
            </Link>
          )}

          {/* Categories */}
          {isAdmin && (
            <Link
              href="/dashboard/categories"
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <h2 className="text-xl font-semibold mb-2">Manage Categories</h2>
              <p className="text-gray-600">Add and edit categories</p>
            </Link>
          )}

          {/* All Books */}
          <Link
            href="/books"
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold mb-2">Browse Books</h2>
            <p className="text-gray-600">View all available books</p>
          </Link>

          {/* All Posts */}
          <Link
            href="/posts"
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold mb-2">Browse Posts</h2>
            <p className="text-gray-600">Read all blog posts</p>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

