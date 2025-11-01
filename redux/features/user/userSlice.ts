import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
    email: string;
    id: string;
    name: string;
    role: string;
}

const initialState: IUserState = {
    email: '',
    id: '',
    name: '',
    role: 'user',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload?.email;
            state.id = action?.payload.id;
            state.name = action?.payload.name;
            state.role = action?.payload.role;
        },
        handleLogout: (state) => {
            state.email = '';
            state.id = '';
            state.name = '';
            state.role = 'user';
        },
    },
});

export const { setUser, handleLogout } = userSlice.actions;

export default userSlice.reducer;

