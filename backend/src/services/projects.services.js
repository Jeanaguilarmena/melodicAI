import { db } from '../config/firebaseAdmin.js';
import admin from "firebase-admin";

export const getUserProjects = async (userId) => {
    try {
        const snapshot = await db.collection("projects").where("userId", "==", userId).get();

        if (snapshot.empty) {
            return [];
        }

        const projects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return projects;

    } catch (error) {
        console.error("Error fetching user projects", error)
        throw error;
    }
}

export const getRecentUserProjects = async (userId) => {
    try {
        const snapshot = await db.collection("projects")
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc")
            .limit(3)
            .get();

        if (snapshot.empty) {
            return [];
        }

        const projects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return projects

    } catch (error) {
        console.error("Error fetching recent projects", error)
        throw error;
    }
}

export const saveUserProject = async (userId, project) => {
    try {

        const newProject = {
            userId,
            ...project,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }

        const docRef = await db.collection("projects").add(newProject);

        return {
            id: docRef.id,
            newProject
        }
    } catch (error) {
        console.error("Error in saveUserProject service:", error);
        throw error;
    }
}