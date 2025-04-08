import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FileType } from "../types/FileType";
import apiClient from "../apiClient";

export const getAllFiles = createAsyncThunk('files/getAll', async (_, thunkAPI) => {
    try {
        const response = await apiClient.get("files");
        return response.data as FileType[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
//get all files by id user
export const getFilesByUser = createAsyncThunk('users/getFiles',async (userId:number, thunkAPI)=>{
    try{
        const response = await apiClient.get(`$user/${userId}/files`);
        return response.data as FileType[];
    }catch(e){
        return thunkAPI.rejectWithValue(e);
    }
});

export const getFileById = createAsyncThunk('files/getById', async (fileId: number, thunkAPI) => {
    try {
        const response = await apiClient.get(`$file/${fileId}`);
        return response.data as FileType;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const addFile = createAsyncThunk('files/add', async (file: Partial<FileType>, thunkAPI) => {
    try {
        const response = await apiClient.post('file', file);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateFile = createAsyncThunk('files/update', async ({ fileId, file }: { fileId: number, file: FileType }, thunkAPI) => {
    try {
        const response = await apiClient.put(`file/${fileId}`, file);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteFile = createAsyncThunk('files/delete', async (fileId: number, thunkAPI) => {
    try {
        const response = await apiClient.delete(`file/${fileId}`);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

const filesSlice = createSlice({
    name: 'files',
    initialState: { list: [] as FileType[], loading: false, error: null as string | null, selectedFile: null as FileType | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...action.payload];
                state.selectedFile = null;
            })
            .addCase(getAllFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            .addCase(getFilesByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFilesByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...action.payload];
                state.selectedFile = null;
            })
            .addCase(getFilesByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getFileById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFileById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedFile = action.payload;
            })
            .addCase(getFileById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFile.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
                state.selectedFile = action.payload;
            })
            .addCase(addFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFile.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex(file => file.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                    state.selectedFile = action.payload;
                }
            })
            .addCase(updateFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(file => file.id !== action.payload.id);
                if (state.selectedFile && state.selectedFile.id === action.payload.id) {
                    state.selectedFile = null;
                }
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default filesSlice;