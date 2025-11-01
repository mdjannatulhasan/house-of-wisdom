import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

async function getPost(id: string) {
  try {
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
      },
    });
    return post;
  } catch (error) {
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post || post.deletedAt) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/posts"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to all posts
        </Link>

        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center justify-between text-gray-600 mb-6 pb-6 border-b">
            <div className="flex items-center space-x-4">
              <span>By {post.user.name}</span>
              {post.category && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {post.category.title}
                </span>
              )}
            </div>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </div>
    </MainLayout>
  );
}

