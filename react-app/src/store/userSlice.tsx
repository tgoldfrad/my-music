import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";


const userSlice = createSlice({
    name: 'user',
    initialState: {currentUser:{} as UserType},
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload;
        },
        clearUser(state) {
            state.currentUser = {} as UserType;
        },
    },  
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
