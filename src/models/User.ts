import { Schema, Document, model, Types } from "mongoose";

interface User extends Document {
    clerkId: string;
    email: string;
    name: string;
    itineraries: Types.ObjectId[];
}

const userSchema = new Schema<User>({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    itineraries: [{ type: Types.ObjectId, ref: "Itinery" }],
});

export const User = model<User>("User", userSchema);
