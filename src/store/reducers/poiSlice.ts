import { createSlice } from "@reduxjs/toolkit";
import { cityPlacesThunks } from "../thunks/cityThunk";

export interface Places {
    name: string;
    address: string;
    phone: string;
    site: string;
    types: string[];
}

interface InitialState {
    places: Places[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

const initialState: InitialState = {
    places: [],
    status: "idle",
    error: "",
};

const poiSlice = () =>
    createSlice({
        name: "poi",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(cityPlacesThunks.pending, (state) => {
                    state.places = [];
                    state.status = "loading";
                    state.error = "";
                })
                .addCase(cityPlacesThunks.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.places = action.payload as Places[];
                })
                .addCase(cityPlacesThunks.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string;
                });
        },
    });

export const poiReducer = poiSlice().reducer;
