import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { User } from "./src/models/User";
import { Itinery } from "./src/models/Itinery";
import connectDB from "./src/config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.post("/api/users", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to create user` });
    }
});

app.post("/api/itinery", async (req, res) => {
    try {
        const newItinery = new Itinery({
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            pointsOfInterest: req.body.pointsOfInterest,
        });

        const savedItinery = await newItinery.save();
        res.status(201).json(savedItinery);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to create itinery` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
