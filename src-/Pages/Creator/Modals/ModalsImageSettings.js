import { Box, Button, Grid, Input, makeStyles, Modal, Slider, } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { getImage } from '../Db/StoreDb';

const userStyle = makeStyles((theme, responsive) => ({
    centerBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "800px",
        height: "400px",
        backgroundColor: 'rgb(33, 33, 33)',
        border: '2px solid #000',
        color: "white",
        [theme.breakpoints.down("sm")]: {
            width:"96%",
            height:"96vh",
        },
    },
    model: {
        background: " rgba(255,255,255,0.4)",
        backdropFilter: "blur(5px)"
    },
    modalclose: {
        position: "absolute",
        right: "0px",
        backgroundColor: "white",
        cursor: "pointer",
        color: "black"
    },
    formcolumnsHolder: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            flexDirection:"column",
            alignItems:"center"
        },
    },
    singlecolumn: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            
        },
    },
    singleInputText: {
        padding: '8px 8px',
        margin: ' 5px 0',
        boxSizing: 'border-box',
        width: "100%",
        backgroundColor: "transparent",
        border: "1px solid #bebebe",
        borderRadius: "4px",
        color: "white"
    },

    centerMainDiv: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        color: "white",
        
    },
    controllerbtns: {
        backgroundColor: "white",
        color: "black",
        margin: '5px',

    },
    btnsHolder: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    singleInputController: {
        marginBottom: "30px"
    }
}));
export default function ModalsImageSettings({ _IndexDBCreate, _IndexDBData, _IndexDB,  imageSettingsDialog, setimageSettingsDialog, images, setImages, LayersList, setLayersList }) {
    const classes = userStyle();
    const handleOpen = () => setimageSettingsDialog(true);
    const [currentimagefile, setcurrentimagefile] = useState({});
    const handleClose = () => {
        setimageSettingsDialog(false);

        //now we should clear the blob created
        URL.revokeObjectURL(imageSettingsDialog.preview)
        URL.revokeObjectURL(currentimagefile)
    }

    const inputName = useRef();
    const inputRarity = useRef();
    const [Rarity, setRarity] = useState(imageSettingsDialog.rarity);

    const [imageurl, setImageURL] = useState("");

    // getting image from local db and putting it
    //this use imageurl instead of imageSettingsDialog.preview
    useEffect(() => {
        getImage( _IndexDBCreate, _IndexDB, "imageserver" ).then(function (result) {
            if (typeof result === "object") {
                let tempimagedata = result.filter(function (ele) {
                    return ele.imgname == imageSettingsDialog.dexieID;
                });
                if (tempimagedata.length > 0) {
                    if (tempimagedata[0].img != undefined) {
                        setImageURL(URL.createObjectURL(tempimagedata[0].img))

                        //temporarily saving the file object for removal when closing the modal
                        setcurrentimagefile(tempimagedata[0].img)
                    }
                }
            }
        });
        
        
    }, [imageSettingsDialog]);


    useEffect(() => {
        setRarity(imageSettingsDialog.rarity)
    }, [imageSettingsDialog]);


    const handleSliderChange = (event, newRarity) => {
        setRarity(newRarity);
    };

    const handleInputChange = (event) => {
        setRarity(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (Rarity < 0) {
            setRarity(0);
        } else if (Rarity > 100) {
            setRarity(100);
        }
    };

    const saveImageSettings = () => {
        let tempImages = images
        for (let i = 0; i < tempImages.length; i++) {
            const image = tempImages[i];
            if (image.imageID == imageSettingsDialog.imageID) {
                tempImages[i].ImageName = inputName.current.value
                tempImages[i].rarity = Rarity
            }
        }
        setImages(tempImages)
        handleClose()
    }
    const removeImg = () => {
        let tempImages = [...images]
        //removing
        //console.log(tempImages)
        for (let i = 0; i < tempImages.length; i++) {
            const image = tempImages[i];
            //console.log(image.imageID, imageSettingsDialog.imageID)
            if (image.imageID == imageSettingsDialog.imageID) {
                tempImages.splice(i, 1);
            }
        }
        //correcting layer's images count
        let templayerslist = [...LayersList]
        for (let i = 0; i < templayerslist.length; i++) {
            const layer = templayerslist[i];
            if (layer.layerid == imageSettingsDialog.layerid) {
                templayerslist[i].imagescount = templayerslist[i].imagescount - 1
            }
        }
        //setLayersList(templayerslist)


        setImages(tempImages)
        handleClose()
    }
    const getImageImage = () =>{
        return imageSettingsDialog.ImageName
    }
    return (
        <Modal
            open={imageSettingsDialog}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={classes.model}
        >
            <Box className={classes.centerBox} >
                <div className={classes.modalclose} onClick={() => handleClose()}>
                    <CloseOutlined />
                </div>
                <div className={classes.centerMainDiv}>
                    <h2>Image Details</h2>
                    <div className={classes.formcolumnsHolder}>
                        <div className={classes.singlecolumn}>
                            <div style={{ width: "80%", height: "100%", marginLeft: "auto", marginRight: "auto", maxHeight: "300px" }} >
                                <img style={{ width: "100%", height: "100%", marginLeft: "auto", marginRight: "auto" }} src={imageurl} />
                                <br />
                                <label > {imageSettingsDialog.filename} </label>

                                <br />

                            </div>

                        </div>
                        <div className={classes.singlecolumn}>

                            <div className={classes.singleInputController}>
                                <p>Image Name</p>

                                <label>A Name for your Image, it will appear in the Metadata</label>
                                <input className={classes.singleInputText} maxLength="95" type="text" ref={inputName} />


                            </div>

                            <div className={classes.singleInputController}>

                                <p>Image Rarity</p>
                                <label>How Often this Image should appear in the collection</label>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>

                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            style={{ color: "#bebebe", marginTop: "20px" }}
                                            value={typeof Rarity === 'number' ? Rarity : 0}
                                            onChange={handleSliderChange}
                                            aria-labelledby="input-slider"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            style={{ color: "#bebebe " }}
                                            value={Rarity}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            inputProps={{
                                                step: 10,
                                                min: 0,
                                                max: 100,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row", }}>
                                <Button style={{ color: "red", bottom: "0px" }} onClick={() => removeImg()}>
                                    <Image /> Remove
                                </Button>
                                <div className={classes.btnsHolder}>
                                    <Button className={classes.controllerbtns} onClick={() => saveImageSettings()}>
                                        Save
                                    </Button>

                                    <Button className={classes.controllerbtns} onClick={() => handleClose()} >
                                        Close
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </Box>
        </Modal>
    );
}
