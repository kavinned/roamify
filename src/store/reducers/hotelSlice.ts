import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = () =>
    createSlice({
        name: "hotel",
        initialState: {
            hotels: [],
            status: "idle",
            error: null,
        },
        reducers: {},
    });

export const hotelReducer = hotelSlice().reducer;
