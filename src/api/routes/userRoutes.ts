import express from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../../middleware/protected";

const router = express.Router();

router.get("/", verifyJWT, async (_req, res) => {
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
        user,
    }).status(201);
    return;
});

router.post("/login", async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user!.password))) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        jwtSecret,
        {
            expiresIn: process.env.JWT_EXPIRATION,
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
        sameSite: "strict",
        secure: true,
    })
        .status(200)
        .json({ message: `${user?.name} logged in successfully`, user: user });
});

router.post("/logout", async (_req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
});

export default router;
