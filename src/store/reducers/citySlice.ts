import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    entityId: string | null;
    latlng: string | null;
    name: string | null;
    description: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

const initialState: InitialState = {
    entityId: null,
    latlng: null,
    name: null,
    description: null,
    status: "idle",
    error: "",
};

const citySlice = () =>
    createSlice({
        name: "city",
        initialState,
        reducers: {},
    });

export const cityReducer = citySlice().reducer;
