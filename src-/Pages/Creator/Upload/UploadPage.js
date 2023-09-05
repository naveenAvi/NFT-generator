import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../GenerateOrder/ProgressBar';
import { ImagesUpload } from './ImagesUpload';
import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { ImageData } from './ImageData';
import { CreateProject } from './Createproject';

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
            width: "90%",
            height: "auto"
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
            flexDirection: "column"
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
    centerdiv: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto"
    }
}));
 
export default function UploadPage({images, setgenerateorder, generateorder, projectdata, selectedPage, setprojectdata, setSelectedPage, LayersList }) {
    const classes = userStyle();
    const [controllingprogress, setcontrollingprogress] = useState(-10)
    const [generationProgress, setgenerationProgress] = useState({
        totalbytes: 0,
        uploadedbytes: 0,
        total: 0,
        current: 0,
        isdone: "no",
        projectid:""
    })

    const handleClose = () => {
        setgenerateorder(false);
    }
    //alert(navigator.deviceMemory)

    //console.log(window.performance.memory)
    async function uploadingma() {
        //if (selectedPage == 5) {
            alert("actually uploading")
            var proid =await CreateProject(projectdata, images, setprojectdata)
            if( generationProgress.isdone == "uploaded" ){
                console.log( generationProgress )
                setSelectedPage(6)
            }else if( proid ){
                console.log("uploading images")
                await ImageData(projectdata, images, setgenerationProgress, LayersList)
                await ImagesUpload(projectdata, generationProgress, setgenerationProgress, controllingprogress, setcontrollingprogress, setSelectedPage)
            }
        //}
    }
    useEffect(() => {
        //setgenerationProgress({ total: 100, current: 0, isdone: "no" });
        uploadingma()
    }, [selectedPage, generateorder]);


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
            <div className={classes.centerdiv}>
                <h2>Uploading your project assets!</h2>

                <ProgressBar generationProgress={generationProgress} setgenerationProgress={setgenerationProgress} />
                <p>{Math.round(generationProgress.uploadedbytes / 1024)}KB / {Math.round(generationProgress.totalbytes / 1024)}KB</p>
                <p>Do not close this window until all the images uploaded!</p>

            </div>
        </Box>
    </Modal>;
}
