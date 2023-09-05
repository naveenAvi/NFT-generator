import { Box, Button, Grid, Input, makeStyles, Modal, Slider, } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { removeImageData } from '../Db/StoreDb';

const userStyle = makeStyles((theme, responsive) => ({
    centerBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "400px",
        height: "400px",
        backgroundColor: 'rgb(33, 33, 33)',
        border: '2px solid #000',
        color: "white",
        [theme.breakpoints.down("sm")]: {
            width: "96%",
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
    },
    singlecolumn: {
        width: "100%"
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
        color: "white"
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
export default function LayerSettingsModel({ layerSettingsDialog, images, setlayerSettingsDialog, LayersList, setLayersList, setImages, setSelectedLayer }) {

    const classes = userStyle();
    const handleClose = () => setlayerSettingsDialog(false);

    const inputName = useRef();
    const inputRarity = useRef();
    //console.log(layerSettingsDialog)

    const [Rarity, setRarity] = useState(layerSettingsDialog.layerrarity);
    const [layername, setlayername] = useState(layerSettingsDialog.layername);

    const removebtnstate = () => {
        if (LayersList.length > 1) {
            return "delete"
        } else {
            return "minimumlayers"
        }
    }
    const [deletebuttonDisplay, setdeletebuttonDisplay] = useState(removebtnstate);

    useEffect(() => {
        setRarity(layerSettingsDialog.layerrarity)
        setdeletebuttonDisplay(removebtnstate)
        setlayername(layerSettingsDialog.layername);

    }, [layerSettingsDialog]);


    const handleSliderChange = (event, newRarity) => {
        setRarity(newRarity);
    };
    const handleInputChange = (event) => {
        setRarity(event.target.Rarity === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (Rarity < 0) {
            setRarity(0);
        } else if (Rarity > 100) {
            setRarity(100);
        }
    };

    const saveImageSettings = () => {
        let tempLayers = [...LayersList]
        for (let i = 0; i < tempLayers.length; i++) {
            const image = tempLayers[i];
            if (image.layerid == layerSettingsDialog.layerid) {
                tempLayers[i].layername = layername
                tempLayers[i].layerrarity = Rarity
                tempLayers[i].rarity = Rarity
            }
        }
        setLayersList(tempLayers)
        handleClose()
    }
    const removeImg = () => {
        setdeletebuttonDisplay("confirm")

    }
    const removeImgConfirmation = () => {
        let tempLayers = LayersList.slice();
        let i = tempLayers.length
        while (i--) {
            const layer = tempLayers[i];
            if (layer.layerid == layerSettingsDialog.layerid) {
                tempLayers.splice(i, 1);
            }
        }
        let tempimages = images
        i = tempimages.length
        //console.log( tempLayers )
        setLayersList(tempLayers)
        while (i--) {
            const image = tempimages[i];
            //why am i removing all images data?
            if (image.layerid == layerSettingsDialog.layerid) {
                URL.revokeObjectURL(image.preview)
                tempimages.splice(i, 1);
                removeImageData(image.dexieID)
            }
        }
        setSelectedLayer(LayersList[0].layerid)
        

        //console.log(tempimages)
        setImages(tempimages)
        //alert(removedcount)
        handleClose()
    }
    return (
        <Modal
            open={layerSettingsDialog}
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
                    <h2>Layer Details</h2>
                    <div className={classes.formcolumnsHolder}>
                        <div className={classes.singlecolumn}>

                            <div className={classes.singleInputController}>
                                <p>Layer Name</p>

                                <label>A Name for your Layer</label>
                                <input className={classes.singleInputText} value={layername} onChange={(e)=>setlayername(e.currentTarget.value)} type="text" ref={inputName} />


                            </div>

                            <div className={classes.singleInputController}>

                                <p>Layer Rarity</p>
                                <label>How Often this Layer should appear in the collection</label>
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
                                <div>
                                    <Button style={{ color: (deletebuttonDisplay == "minimumlayers" ? "black" : "red"), bottom: "0px", display: (((deletebuttonDisplay == "delete") || (deletebuttonDisplay == "minimumlayers") ? "flex" : "none")), cursor: (deletebuttonDisplay == "minimumlayers" ? "not-allowed" : "pointer") }} disabled={(deletebuttonDisplay == "minimumlayers" ? true : false)} onClick={() => removeImg()}>
                                        <Image /> Remove
                                    </Button>
                                </div>

                                < div style={{ display: "flex", flexDirection: "row", display: (deletebuttonDisplay == "confirm" ? "flex" : "none"), zIndex: "100" }}>
                                    <Button style={{ color: "white", backgroundColor: "red", bottom: "0px", border: "1px solid red", paddingLeft: "15px", paddingRight: "15px", marginRight: "10px" }} onClick={() => removeImgConfirmation()}>
                                        Confirm?
                                    </Button>
                                    <Button style={{ color: "black", backgroundColor: "white", bottom: "0px", border: "1px solid white" }} onClick={() => setdeletebuttonDisplay("delete")}>
                                        No
                                    </Button>
                                </div>


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
                <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgb(0 0 0 / 85%)", top: "0px", zIndex: "20", display: (deletebuttonDisplay == "confirm" ? "flex" : "none"), flexDirection: "column", justifyContent: "space-between", alignItems: 'center' }}>
                    <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                        <h1 style={{ backgroundColor: "black" }}> Are you sure to delete this layer? </h1>

                        <h2 style={{ backgroundColor: "black" }}>all the images in this layer will also be deleted</h2>
                    </div>

                </div>
            </Box>

        </Modal>
    );
}
