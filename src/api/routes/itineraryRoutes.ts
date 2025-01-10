import express from "express";
import { Itinerary } from "../../models/Itinerary";
const router = express.Router();

router.post("/", async (req, res) => {
    const itinerary = req.body;
    try {
        const newItinerary = new Itinerary({
            name: itinerary.name,
            startDate: itinerary.startDate,
            endDate: itinerary.endDate,
            pointsOfInterest: itinerary.pointsOfInterest,
            hotel: itinerary.hotel,
        });

        const savedItinerary = await newItinerary.save();
        res.status(201).json(savedItinerary);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to create itinerary` });
    }
});

export default router;
