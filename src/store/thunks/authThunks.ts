import { createAsyncThunk } from "@reduxjs/toolkit";

interface credentials {
    email: string;
    password: string;
    name?: string;
}

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials: credentials, thunkApi) => {
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue(data.message);
            }
            return data;
        } catch (error) {
            if (error instanceof Error)
                return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (credentials: credentials, thunkAPI) => {
        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/users/logout", {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
        }
    }
);
