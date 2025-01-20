import { createSlice } from "@reduxjs/toolkit";
import { searchThunk } from "../thunks/searchThunk";

export interface Results {
    name: string;
}

interface InitialState {
    results: Results[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

const initialState: InitialState = {
    results: [],
    status: "idle",
    error: "",
};

const searchSlice = () =>
    createSlice({
        name: "search",
        initialState,
        reducers: {
            resetSearch: () => initialState,
        },
        extraReducers: (builder) => {
            builder
                .addCase(searchThunk.pending, (state) => {
                    state.status = "loading";
                    state.error = "";
                })
                .addCase(searchThunk.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.results = action.payload as Results[];
                })
                .addCase(searchThunk.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string;
                });
        },
    });

export const searchReducer = searchSlice().reducer;

export const { resetSearch } = searchSlice().actions;