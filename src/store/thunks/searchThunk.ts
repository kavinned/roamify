import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchURL } from "../../utils/API_URLS";
import { Results } from "../reducers/searchSlice";

export const searchThunk = createAsyncThunk(
    "search/search",
    async (query: string, thunkApi) => {
        try {
            const response = await fetch(searchURL(query), {
                method: "GET",
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.statusText === "Unauthorized")
                    window.location.reload();
                return thunkApi.rejectWithValue(data.message);
            }

            const transformedData: Results[] = data.geonames.map(
                (place: { toponymName: string; lat: string; lng: string }) => ({
                    name: place.toponymName,
                    lat: parseFloat(place.lat),
                    lng: parseFloat(place.lng),
                })
            );

            return transformedData;
        } catch (error) {
            if (error instanceof Error)
                return thunkApi.rejectWithValue(error.message);
        }
    }
);
