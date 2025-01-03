import express from "express";
import { Itinerary } from "../../models/Itinerary";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newItinerary = new Itinerary({
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            pointsOfInterest: req.body.pointsOfInterest,
        });

        const savedItinerary = await newItinerary.save();
        res.status(201).json(savedItinerary);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to create itinerary` });
    }
});

export default router;
