import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "../thunks/authThunks";

interface initialState {
    isAuth: boolean;
    status: string;
    error: string;
}

const initialState: initialState = {
    isAuth: false,
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
            .addCase(loginThunk.fulfilled, (state) => {
                state.status = "succeeded";
                state.isAuth = true;
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
                state.isAuth = true;
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
            });
    },
});

export const authReducer = authSlice.reducer;
