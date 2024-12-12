import express from "express";
import { Itinery } from "../models/Itinery";

const router = express.Router();

router.post("/", async (req, res) => {
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

export default router;
