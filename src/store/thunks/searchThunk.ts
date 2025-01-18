import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchURL } from "../../utils/API_URLS";
import { Results } from "../reducers/searchSlice";

export const searchThunk = createAsyncThunk(
    "search/search",
    async (query: string, thunkApi) => {
        try {
            console.log("Making search request to:", searchURL(query));

            const response = await fetch(searchURL(query), {
                method: "GET",
                headers: {
                    "Cache-Control": "no-cache",
                },
            });

            const data = await response.json();

            console.log("Search response:", data);

            if (!response.ok) {
                return thunkApi.rejectWithValue(data.message);
            }

            type GeoNamesResponse = typeof data.geonames;

            const transformedData: Results[] = data.geonames.map(
                (place: GeoNamesResponse) => ({
                    name: place.toponymName,
                })
            );

            return transformedData;
        } catch (error) {
            if (error instanceof Error)
                return thunkApi.rejectWithValue(error.message);
        }
    }
);
