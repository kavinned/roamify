import { createSlice } from "@reduxjs/toolkit";
import {
    checkAuthStatus,
    loginThunk,
    logoutThunk,
    registerThunk,
} from "../thunks/authThunk";

interface User {
    _id: string;
    email: string;
    name: string;
    itineries?: { name: string; description: string }[];
}

interface initialState {
    isAuth: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
    user: null | User;
}

const initialState: initialState = {
    isAuth: false,
    user: null,
    status: "idle",
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(registerThunk.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logoutThunk.fulfilled, () => {
                return initialState;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(checkAuthStatus.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.status = "failed";
                state.isAuth = false;
                state.user = null;
            });
    },
});

export const authReducer = authSlice.reducer;
