import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.VITE_PORT || 3000;
const MONGOURL = process.env.VITE_DATABASE_URL;

if (!MONGOURL) {
    console.error(
        "MongoDB connection URL is not defined in environment variables"
    );
    process.exit(1);
}

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
