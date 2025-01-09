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
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

const initialState: InitialState = {
    hotels: [],
    status: "idle",
    error: "",
};

const hotelSlice = () =>
    createSlice({
        name: "hotel",
        initialState,
        reducers: {},
    });

export const hotelReducer = hotelSlice().reducer;
