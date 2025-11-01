import { IChapter } from '@/types/globalTypes';
import { IBook } from '@/types/homeType';
import { createSlice } from '@reduxjs/toolkit';

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

// Removed unused thunk to avoid axios dependency during build

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
    extraReducers: () => {},
});

export const { toggleState, setIsLoading, setChapter, setContent } =
    chapterSlice.actions;

export default chapterSlice.reducer;
