import { db } from '../config/firebaseAdmin.js';

export const getUserById = async (userId) => {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return null;
        }

        return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const createUser = async (firebaseUser) => {
    const uid = firebaseUser.uid;
    const ref = db.collection("users").doc(uid);

    const snap = await ref.get();

    if (snap.exists) {
        return { created: false };
    }

    const newUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || "No Name",
        photoURL: firebaseUser.photoURL || null,
        artisticName: firebaseUser.artisticName || "No Artistic Name",
        country: firebaseUser.country || "",
        ocupation: firebaseUser.ocupation || "",
        createdAt: new Date(),
    };

    await ref.set(newUser);

    return { created: true, user: newUser };
};