import { db } from '../config/firebaseAdmin.js';
import admin from "firebase-admin";

export const getUserProjects = async (id) => {

}

export const getRecentUserProjects = async (id) => {

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