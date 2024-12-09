import mongoose, { Schema, Document } from "mongoose";

export interface Itinery extends Document {
    name: string;
    city: string;
    startDate: Date;
    endDate: Date;
    pointsOfInterest: PointOfInterest[];
    createdBy: mongoose.Types.ObjectId;
}

export interface PointOfInterest {
    name: string;
    description: string;
}

const pointOfInterestSchema = new Schema<PointOfInterest>({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const itinerySchema = new Schema<Itinery>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pointsOfInterest: [pointOfInterestSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Itinery = mongoose.model<Itinery>("Itinery", itinerySchema);

export default Itinery;
