import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginType, UserType } from "../types/UserType";

const baseUrl = "/users";
export const getAllUsers = createAsyncThunk('users/getAll',async (_, thunkAPI)=>{
    try{
        const response = await axios.get(baseUrl);
        return response.data as UserType[];
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
});

export const getUserById = createAsyncThunk('users/getById',async (userId:number, thunkAPI)=>{
    try{
        const response = await axios.get(`${baseUrl}/${userId}`);
        return response.data as UserType;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
});

export const register = createAsyncThunk('users/register',async (user: Partial<UserType>, thunkAPI)=>{
    try{
        const response = await axios.post(`${baseUrl}/register`,user);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const login = createAsyncThunk('users/login',async (user: LoginType, thunkAPI)=>{
    try{
        const response = await axios.post(`${baseUrl}/login`,user);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const updateUser = createAsyncThunk('users/update',async ({userId,user}:{userId:number,user: UserType}, thunkAPI)=>{
    try{
        const response = await axios.put(`${baseUrl}/${userId}`,user);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteUser = createAsyncThunk('users/delete',async (userId:number, thunkAPI)=>{
    try{
        const response = await axios.delete(`${baseUrl}/${userId}`);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {list:[] as UserType[],loading:false,error:null as string|null,selectedUser:null as UserType|null},
    reducers: {
    },
 
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
       .addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.list = [...action.payload]
            state.selectedUser = null;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(getUserById.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedUser = action.payload;
        })
        .addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(register.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.list.push(action.payload)
            state.selectedUser = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(login.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedUser = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(updateUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.list.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
                state.selectedUser = action.payload;
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(deleteUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.list = state.list.filter(user => user.id !== action.payload.id);
            if (state.selectedUser && state.selectedUser.id === action.payload.id) {
                state.selectedUser = null; 
            }
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
   
});
export default usersSlice;
