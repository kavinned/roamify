import { createSlice } from "@reduxjs/toolkit";

interface Hotel {
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
            setDate: (state, action) => {
                state.checkinDate = action.payload.checkInDate;
                state.checkoutDate = action.payload.checkOutDate;
            },
        },
    });

export const hotelReducer = hotelSlice().reducer;
export const hotelActions = hotelSlice().actions;