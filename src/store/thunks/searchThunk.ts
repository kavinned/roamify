import { createAsyncThunk } from "@reduxjs/toolkit";
import { geoNamesURL } from "../../utils/API_URLS";

export const searchThunk = createAsyncThunk(
    "search/search",
    async (query: string, thunkApi) => {
        try {
            const response = await fetch(geoNamesURL(query), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue(data.message);
            }

            const transformedData = data.geonames.map(
                (place: { toponymName: string; lat: string; lng: string }) => ({
                    name: place.toponymName,
                    latitude: parseFloat(place.lat),
                    longitude: parseFloat(place.lng),
                })
            );
            console.log("trans", transformedData);

            return transformedData;
        } catch (error) {
            if (error instanceof Error)
                return thunkApi.rejectWithValue(error.message);
        }
    }
);
