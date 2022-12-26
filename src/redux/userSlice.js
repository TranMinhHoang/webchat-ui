const { createSlice } = require('@reduxjs/toolkit');

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});

export const { getUsersStart, getUsersSuccess, getUserFailed } =
    userSlice.actions;

export default userSlice.reducer;
