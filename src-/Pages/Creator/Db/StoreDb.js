import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';


export function getImage(_IndexDBCreate, _IndexDB, _IndexDBData) {

    //console.log("getting",_IndexDB)
    var db = new Dexie(_IndexDB );
    db.version(1).stores({
        imagesaver: "++id,imgname,img"
    });
    async function doSomething() {
        var ff = db.imagesaver.toArray().then(function (result) {
            // here you can use the result of promiseB
            return result
        });
        return ff
    }

    return (doSomething())
}


export function AddImageData(_IndexDBCreate, _IndexDB, file, uniqueid) {
    var dbs = new Dexie(  "imagesdbn");
    dbs.version(1).stores({
        imagesaver: "++id,imgname,img"
    });

    //console.log("adding", _IndexDBCreate._Base_images.a + _IndexDBCreate._Base_images.fkl + _IndexDBCreate._Base_images.yfk )
    var db = new Dexie( _IndexDBCreate._Base_images.a + _IndexDBCreate._Base_images.fkl + _IndexDBCreate._Base_images.yfk );
    db.version(1).stores({
        imagesaver: "++id,imgname,img"
    });

    async function addFriend(file, uniqueid) {
        try {
            // Add the new friend!
            const id = await db.imagesaver.add({
                imgname: uniqueid,
                img: file
            });
        } catch (error) {
            // setStatus(`Failed to add ${name}: ${error}`);
            console.log(error)
        }
    }

    addFriend(file, uniqueid)

    return ""
}

export function removeImageData(uniqueid) {
    var db = new Dexie("imagesdbn");
    db.version(1).stores({
        imagesaver: "++id,imgname,img"
    });

    async function addFriend(uniqueid) {
        try {
            // Add the new friend!
            const id = await db.imagesaver.where("imgname").anyOf(uniqueid, "")
                .delete()
        } catch (error) {
            // setStatus(`Failed to add ${name}: ${error}`);
            console.log(error)
        }
    }
    addFriend(uniqueid)

    return ""
}

export function clearImagesData(){
    var db = new Dexie("imagesdbn")
    db.delete();
}