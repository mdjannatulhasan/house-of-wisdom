export type IReadingStatus =
    | 'READ_IN_FUTURE'
    | 'READING'
    | 'COMPLETED_READING'
    | 'REMOVE';

export type IChapter = {
    id?: number;
    title: string;
    book_id?: number;
    content: string;
    contents: any;
    order: number;
};

export type ICategory = {
    id?: number;
    title: string;
    menu_order?: number;
    slug?: string;
    parent_id?: any;
};
