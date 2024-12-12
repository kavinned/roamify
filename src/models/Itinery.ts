import mongoose from "mongoose";

const pointsOfInterestSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
});

const itinerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pointsOfInterest: { type: [pointsOfInterestSchema] },
});

export const Itinery = mongoose.model("Itinery", itinerySchema);
