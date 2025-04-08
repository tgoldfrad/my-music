import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginType, UserType } from "../types/UserType";
import apiClient from "../apiClient";
import { FileType } from "../types/FileType";

const baseUrl = 'http://localhost:5035/api/auth'


export const getFilesByUser = createAsyncThunk('users/getFiles',async (userId:number, thunkAPI)=>{
    try{
        const response = await apiClient.get(`user/${userId}/files`);
        return response.data as FileType[];
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
});

export const getUserById = createAsyncThunk('users/getById',async (userId:number, thunkAPI)=>{
    try{
        const response = await apiClient.get(`user/${userId}`);
        return response.data as UserType;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
});

export const registration = createAsyncThunk('users/register',async (user: Partial<UserType>, thunkAPI)=>{
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
        const response = await apiClient.put(`auth/${userId}`,user);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteUser = createAsyncThunk('users/delete',async (userId:number, thunkAPI)=>{
    try{
        const response = await apiClient.delete(`user/${userId}`);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {list:[] as UserType[],loading:false,error:{} as string|null,selectedUser:null as UserType|null},
    reducers: {
    },
 
    extraReducers:(builder)=>{
        builder
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

        .addCase(registration.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registration.fulfilled, (state, action) => {
            state.loading = false;
            state.list.push(action.payload)
            state.selectedUser = action.payload;
        })
        .addCase(registration.rejected, (state, action) => {
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
