import { IChapter } from '@/types/globalTypes';
import { IBook } from '@/types/homeType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface IChapterState {
    status: boolean;
    loading: boolean;
    isLoading: boolean;
    error: string | null;
    chapters: IChapter[];
    chapter: IChapter;
    contents: any;
}

const initialState: IChapterState = {
    status: false,
    loading: false,
    isLoading: false,
    error: null,
    chapters: [],
    chapter: {} as IChapter,
    contents: '',
};

export const fetchChapters = createAsyncThunk(
    'chapters/fetchChapters',
    async (bookId: number, { rejectWithValue }) => {
        try {
            const params = {
                book_id: bookId,
            };

            const response = await axios.get(route('chapter_by_book'), {
                params,
            });
            console.log(response);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const chapterSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {
        toggleState: (state) => {
            state.status = !state.status;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setChapter: (state, action) => {
            state.chapter = action.payload;
        },
        setContent: (state, action) => {
            state.contents = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapters.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchChapters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chapters = action.payload;
            })
            .addCase(fetchChapters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { toggleState, setIsLoading, setChapter, setContent } =
    chapterSlice.actions;

export default chapterSlice.reducer;
