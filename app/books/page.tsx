import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/all-books/Hero';
import BookList from '@/components/all-books/BookList';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getBooks(searchParams: any) {
  try {
    const { searchTerm, genre, year } = searchParams || {};
    
    const where: any = {};
    
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }
    
    if (year) {
      where.publicationDate = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    }
    
    const [books, count] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          category: true,
        },
      }),
      prisma.book.count({ where }),
    ]);
    
    return {
      books: books.map(book => ({
        id: book.id,
        title: book.title,
        cover_image: `/${book.coverImage}`,
        author: book.author,
        genre: book.category?.title || genre || '',
        publication_date: book.publicationDate.toISOString(),
        status: 'active',
      })),
      count,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [], count: 0 };
  }
}

export default async function AllBooksPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const { books, count } = await getBooks(params);

  return (
    <MainLayout>
      <Hero filters={params} />
      <BookList books={books} count={count} />
    </MainLayout>
  );
}
