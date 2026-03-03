import { auth } from "../config/firebaseAdmin.js"

export const firebaseAuthMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // If there is no token, return an unauthorized error
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify if the token is valid, isn't expired, and is issued by Firebase
    const decodedToken = await auth.verifyIdToken(token);
    // If the token is invalid, return an unauthorized error
    if (!decodedToken) {
        return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the decoded token to the request object for further use in the route handlers
    req.user = decodedToken;

    // Continue
    next();
}