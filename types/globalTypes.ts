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

export type IUser = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'user';
    emailVerifiedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
};

