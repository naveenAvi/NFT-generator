import { useState, useEffect } from "react"
import { Button, Input, makeStyles, } from '@material-ui/core';
import { CloseRounded } from "@material-ui/icons";
import localforage from "localforage";
import { useRef } from "react";
import { getImage } from "../Db/StoreDb";


const userStyle = makeStyles((theme) => ({
    imagebox: {
        width: "80%",
        backgroundColor: "#555452",
        borderRadius: "15px",
        //border:"2px solid rgb(33, 33, 33)",
        padding: "5px",
        height: "auto",

    },
    image: {
        width: "100%",
        borderRadius: "5px",
        maxHeight: "200px",
    },
    title: {
        color: "white",
        textAlign: "center",
        width: "90%",
        wordWrap: "break-word",
        marginLeft: "auto",
        marginRight: "auto"
    },
    boxholder: {
        width: "100%",
        float: "left",
        marginBottom: "20px",
        position: "relative",
        cursor: "pointer",
        maxHeight: "300px",
        maxWidth: "200px"
    },
    rarityshow: {
        position: "absolute",
        color: "black",
        backgroundColor: "white",
        marginTop: "5px",
        marginLeft: "4px",
        padding: "3px",
        border: "1px solid black",
        borderTopLeftRadius: "5px",
        borderBottomRightRadius: "5px"
    },

}));

export default function ImagePreview({ _IndexDBCreate, _IndexDBData, _IndexDB, file, setimageSettingsDialog }) {
    const [imageurl, setImageURL] = useState("");
   
    useEffect(() => {
        getImage(_IndexDBCreate, _IndexDB ).then(function (result) {
            // here you can use the result of promiseB
            if (typeof result === "object") {
                //console.log(result)
                let tempimagedata = result.filter(function (ele) {
                    return ele.imgname == file.dexieID;
                });
                if (tempimagedata.length > 0) {
                    /*console.log( tempimagedata )
                    console.log( tempimagedata[0].img )*/

                    //remove that if there's already a blob
                    URL.revokeObjectURL(tempimagedata[0].img)

                    setImageURL(URL.createObjectURL(tempimagedata[0].img))
                }
                //console.log( URL.createObjectURL( result[11].img ) )
            }
        });
    }, [file]);


    const classes = userStyle();
    const selectImage = () => {
        setimageSettingsDialog(file)
    }

    /*
    localforage.getItem(  file.base64  , function(err, value) {
        // Run this code once the value has been
        // loaded from the offline store.
        console.log(value);
        return value
    });*/

    return (
        <div className={classes.boxholder} onClick={() => selectImage()}>
            <div className={classes.rarityshow}> {file.rarity}%</div>

            <div className={classes.imagebox}>
                <img decoding="async" loading="lazy" src={imageurl} className={classes.image} />

                <div className={classes.title}>
                    {(file.ImageName == "" ? file.filename : file.ImageName)}
                </div>
            </div>
        </div>
    )
}

/*

                <img src={file.preview} className={classes.image} />
                */