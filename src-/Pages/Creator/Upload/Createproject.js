import { ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { getImage } from '../Db/StoreDb';
import { storage } from './Upload';
import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore } from "firebase/firestore"

export const CreateProject = async (projectdata, images, setprojectdata) => {
    alert("project created")
    async function createnewproject() {
        if (projectdata.projectid) {
            if (projectdata.projectid !== "") {
                return projectdata.projectid
            }
        }

        const db = getFirestore();
        try {
            const docRef = await addDoc(collection(db, "userprojects"), projectdata);
            console.log("Document written with ID: ", docRef.id);
            setprojectdata((prevState) => (
                { ...prevState, projectid: docRef.id, }))
            return docRef.id
        } catch (e) {
            console.error("Error adding document: ", e);
            return false
        }
    }
    return await createnewproject()
}