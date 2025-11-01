import { IBook } from '@/types/homeType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
            const params = {
                title: args?.searchTerm,
                genre: args?.genre,
                year: args?.year,
                json: true,
            };

            const response = await axios.get('/books', { params });
            console.log(response);

            return response?.data?.books;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
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
