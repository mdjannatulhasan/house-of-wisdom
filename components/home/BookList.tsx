import { IBookWithId } from '@/types/homeType';
import Container from '../common/Container';
import SecTitle from '../common/SecTitle';
import SubTitle from '../common/SubTitle';
import BtnPrimary from '../common/BtnPrimary';
import Book from '../all-books/Book';

interface BookListProps {
    books: IBookWithId[];
}

const BookList = ({ books }: BookListProps) => {
    let bookItems = books?.map(
        ({
            id,
            title,
            cover_image,
            genre,
            publication_date,
            author,
        }: IBookWithId) => (
            <Book
                key={id}
                code={id}
                title={title}
                cover_image={cover_image}
                genre={genre}
                publication_date={publication_date}
                author={author}
            />
        )
    );

    console.log(books);

    return (
        <section className="py-12">
            <Container>
                <div className="flex flex-col justify-center items-center gap-5">
                    <SecTitle>New Horizons of Reading</SecTitle>
                    <SubTitle center>
                        Immerse Yourself in the Latest Literary Treasures. 10
                        Recently Added Books That Will Take You on a Journey of
                        Wonder and Reflection.
                    </SubTitle>

                    <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 max-[460px]:grid-cols-1 gap-6 mt-6">
                        {bookItems}
                    </div>
                    <div className="mt-5">
                        <BtnPrimary href="/books" link>
                            Explore More
                        </BtnPrimary>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BookList;
