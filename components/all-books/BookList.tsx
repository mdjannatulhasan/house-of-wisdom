'use client';

import Container from '../common/Container';
import SecTitle from '../common/SecTitle';
import Book from './Book';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

interface IBookWithId {
    id: number;
    title: string;
    cover_image?: string;
    genre?: string;
    publication_date?: string;
    author?: string;
    status?: string;
}

interface BookListProps {
    books: IBookWithId[];
    count: number;
}

const BookList = ({ books, count }: BookListProps) => {
    let bookItems;
    if (books?.length) {
        bookItems = books.map(
            ({
                id,
                title,
                cover_image,
                genre,
                publication_date,
                author,
                status,
            }) => (
                <Book
                    key={id}
                    code={id}
                    title={title}
                    cover_image={cover_image}
                    genre={genre}
                    publication_date={publication_date}
                    author={author}
                    status={status}
                />
            )
        );
    }

    return (
        <section className="py-12">
            <Container>
                <div className="flex justify-between items-center gap-5">
                    <SecTitle>All Books {count && `(${count})`}</SecTitle>
                    <Link
                        className="text-xl text-blue-600 font-semibold link flex gap-1 items-center"
                        href="/dashboard/books/create"
                    >
                        <BiPlus /> <span>Add Book</span>
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 max-[460px]:grid-cols-1 gap-6 mt-6">
                        {bookItems ? bookItems : 'No Books found'}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BookList;
