import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db";
import userRoutes from "./src/api/routes/userRoutes";
import itineraryRoutes from "./src/api/routes/itineraryRoutes";
import searchRoutes from "./src/api/routes/searchRoutes";
import cityRoutes from "./src/api/routes/cityRoutes";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        origin: [
            "http://localhost:5173",
            "https://roamify.pages.dev",
            "https://roamify-five.vercel.app",
        ],
        credentials: true,
    })
);
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/city", cityRoutes);

app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
