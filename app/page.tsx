import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import Hero from '@/components/home/Hero';
import BookList from '@/components/home/BookList';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return books.map(book => ({
      id: book.id,
      title: book.title,
      cover_image: `/${book.coverImage}`,
      author: book.author,
      genre: book.category?.title || '',
      publication_date: book.publicationDate.toISOString(),
      pdf_file: book.pdfFile,
      type: book.type,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();

  return (
    <>
      <Navbar />
      <Hero />
      <BookList books={books} />
      <Footer />
    </>
  );
}
