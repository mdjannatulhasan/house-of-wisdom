import { IBook } from '@/types/homeType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IBookState {
    status: boolean;
    priceRange: number;
    books: IBook[];
    myBooks: IBook[];
    singleBook: IBook | null;
    loading: boolean;
    reviews: string[];
    isLoading: boolean;
    count: number;
    error: string | null;
}

const initialState: IBookState = {
    status: false,
    priceRange: 0,
    books: [],
    myBooks: [],
    singleBook: null,
    loading: false,
    reviews: [],
    isLoading: false,
    count: 0,
    error: null,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (
        args: { searchTerm?: string; genre?: string; year?: string | number },
        { rejectWithValue }
    ) => {
        try {
            const params = new URLSearchParams();
            if (args?.searchTerm) params.append('title', args.searchTerm);
            if (args?.genre) params.append('genre', args.genre);
            if (args?.year) params.append('year', String(args.year));
            params.append('json', 'true');

            const response = await fetch(`/api/books?${params.toString()}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();
            return data.books;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        toggleState: (state) => {
            state.status = !state.status;
        },
        setSingleBook: (state, action) => {
            state.singleBook = action.payload?.data;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setReview: (state, action) => {
            state.reviews = action.payload?.data;
        },
        setBooks: (state, action) => {
            state.books = action.payload?.data;
            state.count = action.payload?.meta?.total;
        },
        setMyBooks: (state, action) => {
            state.myBooks = action.payload?.data;
            state.count = action.payload?.meta?.total;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    toggleState,
    setSingleBook,
    setLoading,
    setReview,
    setBooks,
    setIsLoading,
    setMyBooks,
} = bookSlice.actions;

export default bookSlice.reducer;

