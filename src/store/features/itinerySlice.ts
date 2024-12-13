import { createSlice } from "@reduxjs/toolkit";

const itinerySlice = () =>
    createSlice({
        name: "itinery",
        initialState: {
            itineries: [],
            status: "idle",
            error: null,
        },
        reducers: {},
    });

export const itineryReducer = itinerySlice().reducer;
