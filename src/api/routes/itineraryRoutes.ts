import express from "express";
import { Itinerary } from "../../models/Itinerary";
import { RequestWithUser, verifyJWT } from "../../middleware/protected";
import { User } from "../../models/User";
const router = express.Router();

router.post("/", verifyJWT, async (req: RequestWithUser, res) => {
    const itinerary = req.body;
    const userId = req.user?.id;

    if (
        !itinerary.name ||
        !itinerary.startDate ||
        !itinerary.endDate ||
        !itinerary.pointsOfInterest ||
        !itinerary.hotel
    ) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }

    try {
        const newItinerary = new Itinerary({
            name: itinerary.name,
            startDate: itinerary.startDate,
            endDate: itinerary.endDate,
            pointsOfInterest: itinerary.pointsOfInterest,
            hotel: itinerary.hotel,
        });

        const savedItinerary = await newItinerary.save();

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { itineraries: savedItinerary._id },
            },
            { new: true }
        );

        res.status(201).json(savedItinerary);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to create itinerary` });
    }
});

export default router;
