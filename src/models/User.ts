import { Schema, Document, model, Types } from "mongoose";

interface User extends Document {
    email: string;
    name: string;
    itineraries: Types.ObjectId[];
}

const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    itineraries: [{ type: Types.ObjectId, ref: "Itinery" }],
});

export const User = model<User>("User", userSchema);
