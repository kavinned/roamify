import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { parseCookies } from "../utils/parseCookies";

export const verifyJWT = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const cookieHeader = req.headers.cookie;
    console.log("Cookie Header:", cookieHeader);
    const cookies = parseCookies(cookieHeader);
    console.log("Parsed Cookies:", cookies);
    const token = cookies.token;
    console.log("Extracted Token:", token);

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            console.log("Token Verification Error:", err);
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return;
        }

        (req as unknown as { user: unknown }).user = decoded;

        console.log("Decoded Token:", decoded);

        next();
    });
};
