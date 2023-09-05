import { useEffect, useRef, useState } from "react"
import { Button, Grid, Input, makeStyles, } from '@material-ui/core';
import DropHere from "./DropHere"
import ImagePreview from "./ImagePreview";
import { getImage, removeImageData } from "../Db/StoreDb";
import { SettingsApplications } from "@material-ui/icons";

const userStyle = makeStyles((theme) => ({
    centersection: {
        width: "94%",
        marginRight: "auto",
        marginLeft: "auto",
        maxHeight:"100vh",
        overflowY:"scroll",
        overflowX:"hidden"
    },
    notification: {
        backgroundColor: "red"
    },
    imagesholder: {
        display: "Grid",
        gridTemplateColumns: "repeat(6, minmax(155px, 2fr))",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, minmax(155px, 2fr))",
        },
        [theme.breakpoints.down("up")]: {
            gridTemplateColumns: "repeat(4, minmax(155px, 2fr))",
        },
        marginTop: "20px",
        overflowY: "scroll",
        overflowX: "hidden",
        height: (responsive) => responsive.imageSectionHeight + "px",
    }
}));

export default function ImagesSection({_IndexDBCreate, _IndexDBData, _IndexDB, images, setImages, selectedLayer, setimageSettingsDialog, LayersList, setLayersList }) {
    const ImagesSectionmain = useRef();
    const [responsive, setResponsive] = useState({})
    useEffect(() => {
        //responsive
        const { y } = ImagesSectionmain.current.getBoundingClientRect()

        setResponsive((prevState) => (
            { ...prevState, imageSectionHeight: (window.innerHeight - (y)) })
        )
    }, []);

    const classes = userStyle(responsive);

    useEffect(() => {
        let i = images.length
        while (i--) {
            const image = images[i];
            URL.revokeObjectURL(image.preview)
        }

        //is this dex id presense in the images list
        const isneeded = (imageDexIDtoCheck) => {
            let isneed = false
            for (let i = 0; i < images.length; i++) {
                const singleimages = images[i];
                if (singleimages.dexieID == imageDexIDtoCheck) {
                    isneed = true
                }
            }
            return isneed
        }

        //removing all images that are created by the db image data
        getImage(_IndexDBCreate, _IndexDB, "imageserver",_IndexDBData).then(function (result) {
            // here you can use the result of promiseB
            if (typeof result === "object") {
                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    //sometimes, images list may lose some data
                    //in those cases we have to release those unused images data from DB
                    if (!(isneeded(element.imgname))) {
                        //should remove from db
                        if (element.imgname !== undefined) {
                            removeImageData(element.imgname)
                        }
                    }
                    if (element.length > 0) {
                        URL.revokeObjectURL(element[0].img)
                    }
                }
            }
        });
    }, [selectedLayer]);


    const imagespreview = images.filter(singleimg => (singleimg.layerid == selectedLayer)).map((file) => (
        //console.log( file[0].preview ),
        /* <div key={file.name}>
             <div>
                 <img src={file.preview} style={{ width: "200px" }} alt="preview" />
             </div>
         </div>*/

        <ImagePreview _IndexDBCreate={_IndexDBCreate} _IndexDBData={_IndexDBData} _IndexDB={_IndexDB} file={file} setimageSettingsDialog={setimageSettingsDialog} />
    ))
    return (
        <div className={classes.centersection}>

            <DropHere _IndexDBCreate={_IndexDBCreate} _IndexDBData={_IndexDBData} _IndexDB={_IndexDB} images={images} setImages={setImages} selectedLayer={selectedLayer} LayersList={LayersList} setLayersList={setLayersList} />


            <div ref={ImagesSectionmain} className={classes.imagesholder}>{imagespreview}</div>

        </div>
    )
}