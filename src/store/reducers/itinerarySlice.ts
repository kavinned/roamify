import { createSlice } from "@reduxjs/toolkit";
import {
    fetchItineraries,
    createItinerary,
    deleteItinerary,
} from "../thunks/itineraryThunk";
import { Itinerary } from "../../models/Itinerary";

interface ItineraryState {
    itineraries: Itinerary[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ItineraryState = {
    itineraries: [],
    status: "idle",
    error: null,
};

const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItineraries.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchItineraries.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.itineraries = action.payload;
            })
            .addCase(fetchItineraries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(createItinerary.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createItinerary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.itineraries.push(action.payload);
            })
            .addCase(createItinerary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(deleteItinerary.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteItinerary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.itineraries = state.itineraries.filter(
                    (itinerary) => itinerary._id !== action.payload
                );
            })
            .addCase(deleteItinerary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const itineraryReducer = itinerarySlice.reducer;
