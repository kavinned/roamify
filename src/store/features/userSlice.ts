import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        status: "idle",
        error: null,
    },
    reducers: {},
});

export const userReducer = userSlice.reducer;
