import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db";
import userRoutes from "./src/routes/userRoutes";
import itineryRoutes from "./src/routes/itineryRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/itineries", itineryRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
