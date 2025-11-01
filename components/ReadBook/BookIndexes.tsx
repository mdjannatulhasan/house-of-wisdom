import { IChapter } from '@/types/globalTypes';
import { IBook } from '@/types/homeType';
import React from 'react';
import BookIndex from './BookIndex';

type Props = {
    book?: IBook;
};

const BookIndexes = ({ book }: Props) => {
    const chapters = ((book as any)?.chapters as IChapter[]) || [];
    if (!chapters.length) return <ul></ul>;
    const bookIndexes = chapters.map((chapter) => (
        <BookIndex key={chapter.id} chapter={chapter} />
    ));
    return <ul>{bookIndexes}</ul>;
};

export default BookIndexes;
