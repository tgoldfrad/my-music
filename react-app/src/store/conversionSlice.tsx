import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ConversionType } from "../types/ConversionType";
import apiClient from "../apiClient";

export const getAllConversions = createAsyncThunk('conversions/getAll', async (_, thunkAPI) => {
    try {
        const response = await apiClient.get('conversionprocess');
        return response.data as ConversionType[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getConversionById = createAsyncThunk('conversions/getById', async (conversionId: number, thunkAPI) => {
    try {
        const response = await apiClient.get(`conversionprocess/${conversionId}`);
        return response.data as ConversionType;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const addConversion = createAsyncThunk('conversions/add', async (conversion: Partial<ConversionType>, thunkAPI) => {
    try {
        const response = await apiClient.post('conversionprocess', conversion);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateConversion = createAsyncThunk('conversions/update', async ({ conversionId, conversion }: { conversionId: number, conversion: ConversionType }, thunkAPI) => {
    try {
        const response = await apiClient.put(`conversionprocess/${conversionId}`, conversion);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteConversion = createAsyncThunk('conversions/delete', async (conversionId: number, thunkAPI) => {
    try {
        const response = await apiClient.delete(`conversionprocess/${conversionId}`);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

const conversionsSlice = createSlice({
    name: 'conversions',
    initialState: { list: [] as ConversionType[], loading: false, error: null as string | null, selectedConversion: null as ConversionType | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllConversions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllConversions.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...action.payload];
                state.selectedConversion = null;
            })
            .addCase(getAllConversions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getConversionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getConversionById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedConversion = action.payload;
            })
            .addCase(getConversionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addConversion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addConversion.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
                state.selectedConversion = action.payload;
            })
            .addCase(addConversion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateConversion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateConversion.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex(conversion => conversion.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                    state.selectedConversion = action.payload;
                }
            })
            .addCase(updateConversion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteConversion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteConversion.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(conversion => conversion.id !== action.payload.id);
                if (state.selectedConversion && state.selectedConversion.id === action.payload.id) {
                    state.selectedConversion = null;
                }
            })
            .addCase(deleteConversion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default conversionsSlice;