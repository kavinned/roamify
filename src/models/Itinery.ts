import { Schema, Document, model } from "mongoose";

interface Itinery extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    pointsOfInterest: { name: string; description: string }[];
}

const pointsOfInterestSchema = new Schema({
    name: { type: String },
    description: { type: String },
});

const itinerySchema = new Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pointsOfInterest: { type: [pointsOfInterestSchema] },
});

export const Itinery = model<Itinery>("Itinery", itinerySchema);
