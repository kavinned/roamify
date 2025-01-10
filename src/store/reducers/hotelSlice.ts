import { createSlice } from "@reduxjs/toolkit";
import { hotelThunk } from "../thunks/cityThunk";

export interface Hotel {
    name: string;
    stars: number;
    image: string;
    distance: string;
    distanceFromPoi: string;
    pricePerNight: string;
    cheapestPartner: string;
}

interface InitialState {
    hotels: Hotel[];
    checkinDate: string;
    checkoutDate: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

const initialState: InitialState = {
    hotels: [],
    checkinDate: "",
    checkoutDate: "",
    status: "idle",
    error: "",
};

const hotelSlice = () =>
    createSlice({
        name: "hotel",
        initialState,
        reducers: {
            resetHotel: () => initialState,
        },
        extraReducers: (builder) => {
            builder
                .addCase(hotelThunk.pending, (state) => {
                    state.status = "loading";
                    state.error = "";
                })
                .addCase(hotelThunk.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.hotels = action.payload ?? [];
                })
                .addCase(hotelThunk.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string;
                });
        },
    });

export const hotelReducer = hotelSlice().reducer;
export const { resetHotel } = hotelSlice().actions;