import { createSlice } from "@reduxjs/toolkit";

const citySlice = () =>
    createSlice({
        name: "city",
        initialState: {
            cities: [],
            status: "idle",
            error: null,
        },
        reducers: {},
    });

export const cityReducer = citySlice().reducer;
