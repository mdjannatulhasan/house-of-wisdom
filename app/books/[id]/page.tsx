import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

async function getBook(id: string) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        chapters: {
          orderBy: { order: 'asc' },
        },
      },
    });
    return book;
  } catch (error) {
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
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/books"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to all books
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Cover
                </div>
              )}
            </div>
            {book.pdfFile && (
              <a
                href={book.pdfFile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700"
              >
                Download PDF
              </a>
            )}
          </div>

          {/* Book Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            {book.category && (
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded mb-4">
                {book.category.title}
              </span>
            )}

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold mb-2">Publication Details</h2>
              <p className="text-gray-600">
                Published: {formatDate(book.publicationDate)}
              </p>
              <p className="text-gray-600">Type: {book.type}</p>
            </div>

            {/* Chapters */}
            {book.chapters.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Chapters</h2>
                <div className="space-y-2">
                  {book.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="bg-white border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <h3 className="font-semibold">
                        Chapter {index + 1}: {chapter.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

