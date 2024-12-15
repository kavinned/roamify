import express from "express";
import { User } from "../../models/User";

const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to fetch users` });
    }
});

router.post("/", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to create user` });
    }
});

export default router;
