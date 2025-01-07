import { createAsyncThunk } from "@reduxjs/toolkit";
import { cityURL } from "../../utils/API_URLS";

export const cityThunk = createAsyncThunk(
    "city/city",
    async (cityName: string, thunkApi) => {
        try {
            const response = await fetch(cityURL(cityName), {
                method: "GET",
            });
            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue(data.message);
            }

            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
);
