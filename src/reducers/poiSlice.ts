import { createSlice } from "@reduxjs/toolkit";

const poiSlice = () =>
    createSlice({
        name: "poi",
        initialState: {
            places: [],
            status: "idle",
            error: null,
        },
        reducers: {},
    });

export const poiReducer = poiSlice().reducer;
