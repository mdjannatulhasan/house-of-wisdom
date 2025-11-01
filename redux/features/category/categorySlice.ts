import { RootState } from '@/redux/store';
import { ICategory } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

interface ICategoryState {
    status: boolean;
    loading: boolean;
    isLoading: boolean;
    error: string | null;
    categories: ICategory[];
    category: ICategory;
}

const initialState: ICategoryState = {
    status: false,
    loading: false,
    isLoading: false,
    error: null,
    categories: [],
    category: {} as ICategory,
};

// Removed unused thunk to avoid axios dependency during build

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        toggleState: (state) => {
            state.status = !state.status;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
    extraReducers: () => {},
});

export const { toggleState, setIsLoading, setCategory } = categorySlice.actions;
export const categoriesList = (state: RootState) => state.categories.categories;
export default categorySlice.reducer;
