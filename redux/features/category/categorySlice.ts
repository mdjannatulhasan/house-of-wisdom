import { RootState } from '@/redux/store';
import { ICategory } from '@/types/globalTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/categories', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload?.categories;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { toggleState, setIsLoading, setCategory } = categorySlice.actions;
export const categoriesList = (state: RootState) => state.categories.categories;
export default categorySlice.reducer;

