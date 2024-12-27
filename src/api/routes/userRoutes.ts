import express, { RequestHandler } from "express";
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

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({
        message: "User has been created",
        email,
        hashedPassword,
    }).status(201);
});

const loginHandler: RequestHandler = async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordValid = await bcrypt.compare(password, user!.password);

    if (!user || !passwordValid) {
        res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user?._id }, jwtSecret, {
        expiresIn: process.env.JWT_EXPIRATION,
    });

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
    }).json({ message: "Login successful" });
};
router.post("/login", loginHandler);

export default router;
