import mongoose from "mongoose";

const pointsOfInterestSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
});

const itinerySchema = new mongoose.Schema({
    name: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    pointsOfInterest: { type: [pointsOfInterestSchema] },
});

export const Itinery = mongoose.model("Itinery", itinerySchema);
