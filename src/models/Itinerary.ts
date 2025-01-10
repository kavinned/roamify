import { Schema, Document, model } from "mongoose";
import { Places } from "../store/reducers/poiSlice";
import { Hotel } from "../store/reducers/hotelSlice";

interface Itinerary extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    pointsOfInterest: Places[];
    hotel: Hotel[];
}

const hotelSchema = new Schema<Hotel>({
    name: { type: String },
    stars: { type: Number },
    image: { type: String },
    distance: { type: String },
    distanceFromPoi: { type: String },
    pricePerNight: { type: String },
    cheapestPartner: { type: String },
});

const pointsOfInterestSchema = new Schema<Places>({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    site: { type: String },
    types: { type: [String] },
});

const itinerarySchema = new Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pointsOfInterest: { type: [pointsOfInterestSchema] },
    hotel: { type: [hotelSchema] },
});

export const Itinerary = model<Itinerary>("Itinerary", itinerarySchema);
