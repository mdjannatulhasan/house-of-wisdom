import MainLayout from '@/components/layouts/MainLayout';
import BookDetailsSection from '@/components/book-details/BookDetailsSection';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getBook(id: string) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });

    if (!book) {
      return null;
    }

    return {
      id: String(book.id),
      title: book.title,
      cover_image: book.coverImage ? `/${book.coverImage}` : '#',
      author: book.author,
      genre: book.category?.title || '',
      publication_date: book.publicationDate.toLocaleDateString(),
      // status/description not present on Book model in Prisma; omit to satisfy types
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <MainLayout>
      <BookDetailsSection book={book} />
    </MainLayout>
  );
}
