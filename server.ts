import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db";
import userRoutes from "./src/api/routes/userRoutes";
import itineraryRoutes from "./src/api/routes/itineraryRoutes";
import searchRoutes from "./src/api/routes/searchRoutes";
import cityRoutes from "./src/api/routes/cityRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/itineries", itineraryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/city", cityRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
