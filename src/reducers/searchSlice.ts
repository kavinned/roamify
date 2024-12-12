import { createSlice } from "@reduxjs/toolkit";

const searchSlice = () =>
    createSlice({
        name: "search",
        initialState: {
            results: [],
            status: "idle",
            error: null,
        },
        reducers: {},
    });

export const searchReducer = searchSlice().reducer;
