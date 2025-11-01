import { IChapter } from './globalTypes';

export type IBook = {
    id?: number | null | undefined;
    code?: string;
    title: string;
    cover_image: string;
    pdf_file?: string;
    genre?: string;
    category_id?: number;
    author?: string;
    publication_date?: string;
    reviews?: string[];
    addedBy?: string;
    status?: string;
    chapters?: IChapter[];
};

export type IBookWithId = IBook & {
    id: string;
};

