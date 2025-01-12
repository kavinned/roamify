import { createSlice } from "@reduxjs/toolkit";
import { Itinerary } from "../../models/Itinerary";

const initialState: Itinerary = {
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    pointsOfInterest: [
        { name: "", address: "", phone: "", site: "", types: [] },
    ],
    hotel: [
        {
            name: "",
            stars: 0,
            image: "",
            distance: "",
            distanceFromPoi: "",
            pricePerNight: "",
            cheapestPartner: "",
        },
    ],
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
