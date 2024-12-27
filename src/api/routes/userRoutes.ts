import express from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to fetch users` });
    }
});

router.post("/register", async (req, res): Promise<void> => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({
        message: "User has been created",
        email,
        hashedPassword,
    }).status(201);
    return;
});

router.post("/login", async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user!.password))) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
    }

    const token = jwt.sign({ userId: user?._id }, jwtSecret, {
        expiresIn: process.env.JWT_EXPIRATION,
    });

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
    })
        .status(200)
        .json({ message: `${user?.name} logged in successfully` });
});

export default router;
