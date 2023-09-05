import { ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { getImage } from '../Db/StoreDb';
import { storage } from './Upload';
import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore, onSnapshot, query, where } from "firebase/firestore"

export const ImageData = async (projectdata, images, setgenerationProgress, LayersList) => {

    async function singleimageuppro(singleimage, db) {
        try {
            const docRef = await addDoc(collection(db, "userimages"), {
                ImageName: singleimage.ImageName,
                dexieID: singleimage.dexieID,
                imageID: singleimage.imageID,
                layerid: singleimage.layerid,
                rarity: singleimage.rarity,
                projectID: projectdata.projectid,
                emailaddress: projectdata.emailaddress,
                filetype: singleimage.filetype,
                filename:singleimage.filename
            });
            //console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async function uploaddata() {
        var totalsize = 0
        var conp = 0
        setgenerationProgress((prevState) => (
            { ...prevState, current: 1, }))
        for (let i = 0; i < images.length; i++) {
            const singleimage = images[i];
            console.log( singleimage )
            //const imageDBdata = await getimageDB( singleimage.dexieID )
            //console.log(imageDBdata)
            const db = getFirestore();

            // Create a reference to the cities collection
            const citiesRef = await query(collection(db, "userimages"), where("projectID", "==", "H2mcP3But78oNZO8DkwI"), where("dexieID", "==", singleimage.dexieID));
            const unsubscribe = onSnapshot(citiesRef, (querySnapshot) => {
                const userimages = [];
                if (querySnapshot.docs.length === 0) {
                    singleimageuppro(singleimage, db)
                }
                /*querySnapshot.forEach((doc) => {
                    userimages.push(doc.data().dexieID);
                });
                console.log("Current cities in CA: ", userimages.join(", "));*/
            });

        }

        for (let i = 0; i < LayersList.length; i++) {
            const singleLayer = LayersList[i];

            const db = getFirestore();
            const citiesRef = await query(collection(db, "userlayers"), where("projectID", "==", "H2mcP3But78oNZO8DkwI"), where("layerid", "==", singleLayer.layerid));
            const unsubscribe = onSnapshot(citiesRef, (querySnapshot) => {
                if (querySnapshot.docs.length === 0) {
                    try {
                        const docRef =  addDoc(collection(db, "userlayers"), {
                            layerid: singleLayer.layerid,
                            layername: singleLayer.layername,
                            layerposition: singleLayer.layerposition,
                            layerrarity: singleLayer.layerrarity,
                            toselectNext: singleLayer.toselectNext,
                            projectID: projectdata.projectid,
                            emailaddress: projectdata.emailaddress,
                        });
                        //console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: layer: ", e);
                    }
                }
                /*querySnapshot.forEach((doc) => {
                    userimages.push(doc.data().dexieID);
                });
                console.log("Current cities in CA: ", userimages.join(", "));*/
            });


        }
    }
    await uploaddata()
}
