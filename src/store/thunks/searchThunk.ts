import { createAsyncThunk } from "@reduxjs/toolkit";
import { geoNamesURL } from "../../utils/API_URLS";

export const searchThunk = createAsyncThunk(
    "search/search",
    async (
        { query, username }: { query: string; username: string },
        thunkApi
    ) => {
        const URL = geoNamesURL(query, username);
        try {
            const response = await fetch(URL, {
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
