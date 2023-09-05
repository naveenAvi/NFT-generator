import { ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { getImage } from '../Db/StoreDb';
import { storage } from './Upload';

export const ImagesUpload = async (projectdata, generationProgress, setgenerationProgress, controllingprogress, setcontrollingprogress, setSelectedPage) => {

    async function uploadimages() {
        var totalsize = 0
        var conp = 0
        return await getImage().then(function (result) {
            if (typeof result === "object") {
                //setgenerationProgress({ total: 100, current: 0, isdone: "no" });


                for (let i = 0; i < result.length; i++) {
                    totalsize = totalsize + result[i].img.size
                }
                setgenerationProgress({
                    totalbytes: totalsize,
                    uploadedbytes: 0,
                    total: totalsize,
                    current: 0,
                    isdone: "no"
                })
                var completed = 0
                for (let i = 0; i < result.length; i++) {
                    const singleimage = result[i];
                    //console.log(singleimage)
                    const storageRef = ref(storage, projectdata.projectid + "_" + singleimage.imgname);

                    // projectdata.projectName + "_" + 

                    // 'file' comes from the Blob or File API
                    const uploadTask = uploadBytesResumable(storageRef, singleimage.img)


                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            //console.log('Upload is ' + progress + '% done');
                            if ((generationProgress.uploadedbytes + snapshot.bytesTransferred) > conp) {
                                setgenerationProgress((prevState) => (
                                    {
                                        ...prevState,
                                        uploadedbytes: generationProgress.uploadedbytes + snapshot.bytesTransferred,
                                        current: generationProgress.uploadedbytes + snapshot.bytesTransferred,
                                    }));
                                conp = conp + snapshot.bytesTransferred
                            }


                        },
                        (error) => {
                            // Handle unsuccessful uploads
                        },
                        () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            //alert("done")
                            completed++
                            if (completed == result.length) {
                                setgenerationProgress((prevState) => (
                                    {
                                        ...prevState,
                                        uploadedbytes: totalsize,
                                        current: totalsize,
                                        isdone: "uploaded"
                                    }));
                                    setSelectedPage(6)
                            }
                        });

                }


            }
        }).then(function (result) {
            return result
        })
    }
    await uploadimages()
}
