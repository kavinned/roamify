import { createSlice } from "@reduxjs/toolkit";
import { searchThunk } from "../thunks/searchThunk";

interface Results {
    lat: number;
    lng: number;
    toponymName: string;
}

interface initialState {
    results: Results[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

const initialState = {
    results: [],
    status: "idle",
    error: "",
};

const searchSlice = () =>
    createSlice({
        name: "search",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(searchThunk.pending, (state) => {
                    state.status = "loading";
                    state.error = "";
                })
                .addCase(searchThunk.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.results = action.payload.results;
                })
                .addCase(searchThunk.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string;
                });
        },
    });

export const searchReducer = searchSlice().reducer;
