import { createSlice } from "@reduxjs/toolkit";
import { Places } from "./poiSlice";
import { Hotel } from "./hotelSlice";

interface draftItinerary {
    name: string;
    startDate: string;
    endDate: string;
    pointsOfInterest: Places[];
    hotel: Hotel[];
}

const initialState: draftItinerary = {
    name: "",
    startDate: "",
    endDate: "",
    pointsOfInterest: [],
    hotel: [],
};

const draftItinerarySlice = () =>
    createSlice({
        name: "draftItinerary",
        initialState,
        reducers: {
            resetItinerary: () => initialState,
            addPoi: (state, action) => {
                state.pointsOfInterest.push(action.payload);
            },
            addHotel: (state, action) => {
                state.hotel = action.payload;
            },
        },
    });

export const draftyItineraryReducer = draftItinerarySlice().reducer;
export const { resetItinerary, addPoi, addHotel } =
    draftItinerarySlice().actions;
