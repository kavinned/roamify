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
            const airScrapperData = data.airscrapperData.data[0];
            const airScrapperTransformed = {
                entityId: airScrapperData.entityId,
                name: airScrapperData.entityName,
                latlng: airScrapperData.location,
            };

            const wikipediaData = Object.values(
                data.wikiData.query.pages
            )[0] as { extract: string };
            const wikipediaExtract = wikipediaData.extract;
            const sentences = wikipediaExtract.match(/[^.!?]+[.!?]+/g);
            const shortenedSentences = sentences?.slice(0, 5).join("");

            const transformedData = {
                ...airScrapperTransformed,
                description: shortenedSentences,
            };
            return transformedData;

        } catch (error) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
);
