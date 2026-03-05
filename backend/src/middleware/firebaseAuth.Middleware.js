import { auth } from "../config/firebaseAdmin.js"

export const firebaseAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodedToken = await auth.verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};