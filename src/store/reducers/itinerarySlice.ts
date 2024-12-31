import { createSlice } from "@reduxjs/toolkit";

const itinerarySlice = () =>
    createSlice({
        name: "itinerary",
        initialState: {
            itineries: [],
            status: "idle",
            error: null,
        },
        reducers: {},
    });

export const itineraryReducer = itinerarySlice().reducer;
