import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import All from '../../Preview/Preview/All';
import { clearImagesData, getImage } from '../Db/StoreDb';
import { Generatepreview } from '../Generator/Generator';

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
        padding: "20px",
        [theme.breakpoints.down("sm")]: {
            width: "96%"
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
            flexDirection: "colum",
        },
    },
    singlecolumn: {
        width: "50%"
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
    },
    singleselectoption: {
        color: "black",
        fontSize: "16px"
    },
    formcolumnsHolder: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    singlecolumn: {
        width: "50%"
    },
}));

export default function Completed({setprojectdata, setorderedsize, setimageSettingsDialog, setgenerateorder, generateorder, images, LayersList, setLayersList, selectedPage, setSelectedPage, setImages }) {
    const classes = userStyle();

    const handleOpen = () => setimageSettingsDialog(true);
    const [currentimagefile, setcurrentimagefile] = useState({});

    const handleClose = () => {
        setSelectedPage("selectpackage")

        //clearing all the stuff
        setgenerateorder(false);
    }
    //alert(navigator.deviceMemory)

    //console.log(window.performance.memory)

    const resetworkarea = () => {
        setLayersList([
            { layerposition: 1, layerid: 1, layername: "Backgrounds", imagescount: 0, layerrarity: 100, toselectNext: 0 },
        ])
        setprojectdata({
            projectName: "",
            projectwidth: 0,
            projectheight: 0,
            emailaddress: ""
        })
        setImages([])
        //clear dexie

        clearImagesData()

        setgenerateorder(false)
    }

    return <Modal
        open={generateorder}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.model}
    >
        <Box className={classes.centerBox} >
            <div className={classes.modalclose} onClick={() => handleClose()}>
                <CloseOutlined />
            </div>

            <h1>Order Placed successfully</h1>
            <div className={classes.formcolumnsHolder}>
                <div className={classes.singlecolumn}>
                    <img src='./images/thanks.jfif' />
                </div>

                <div className={classes.singlecolumn}>
                    <h2>Thanks for choosing us!</h2>
                    <p> your order will be delivered within 2-4 days. It may take longer for high resolution collection generations.</p>
                    <p>We will email you the download link when generation done.</p>

                    <p>Email us to know more details ( email.nftgen@gmail.com ) </p>

                    <Button onClick={() => resetworkarea()} style={{ color: "black", backgroundColor: "white" }}> Create another project </Button>
                </div>
            </div>

        </Box>
    </Modal>;
}
