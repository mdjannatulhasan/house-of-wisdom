import { IChapter } from '@/types/globalTypes';
import { IBook } from '@/types/homeType';
import { usePage } from '@inertiajs/react';
import React from 'react';
import BookIndex from './BookIndex';

type Props = {};

const BookIndexes = (props: Props) => {
    const { book }: { book: IBook } = usePage().props as any;
    const bookIndexes = (book.chapters as IChapter[]).map((chapter) => (
        <BookIndex chapter={chapter} />
    ));
    return <ul>{bookIndexes}</ul>;
};

export default BookIndexes;
