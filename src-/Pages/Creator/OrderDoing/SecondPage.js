import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { MetaDatamaker } from '../GenerateOrder/MetaDatamaker';
import { NewGenerator } from '../GenerateOrder/NewGenerator2';
import ProgressBar from '../GenerateOrder/ProgressBar';
import { saveAs } from "file-saver";
import { Generatepreview } from '../Generator/Generator';

/*import { getImage } from '../Db/StoreDb';
import { Generatepreview } from '../Generator/Generator';
import { NewGenerator } from './NewGenerator';
import {NewGenerator2} from './NewGenerator2';
import ProgressBar from './ProgressBar';
import { saveAs } from "file-saver";
import { MetaDatamaker } from './MetaDatamaker';*/

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
            height:"auto"
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
            width:"80%",
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
    }
}));


export default function SecondPage({ _IndexDBCreate, _IndexDB, setgenerateorder, selectedPage, setSelectedPage, images, LayersList, setLayersList }) {
    const classes = userStyle();
    const canvas = useRef(null)
    const imageref = useRef(null)
    let canvasToCLear;
    useEffect(() => {

        canvasToCLear = document.getElementById('canvasId');
    }, []);
    const handleClose = () => {
        setgenerateorder(false);
    }
    const [generatedPreview, setgeneratedPreview] = useState({})
    const [generationProgress, setgenerationProgress] = useState("")
    const [generationTime, setgenerationTime] = useState(0)

    const generating10asds = async () => {
        // all the other steps are done by useEffects
        canvas.current.width = canvas.current.width
        var generatedLayersArray = Generatepreview(images, LayersList, setLayersList, setgeneratedPreview)

        //we are directly providing NewGenerator the generatedLayersArray
        var result = await NewGenerator( _IndexDBCreate, _IndexDB, images, LayersList, setLayersList, setgeneratedPreview, generatedLayersArray, canvas)
        //console.log("hello")

        return generatedLayersArray
    }
    async function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    const getEndedtime = (startTime, endTime) => {
        endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        timeDiff /= 1000;

        // get seconds 
        var seconds = Math.round(timeDiff);
        setgenerationTime(seconds);
    }
    const getallmetadataJSON = (allmetadata) => {
        let ob = {
            name: "No Name",
            description: "",
            collection: allmetadata
        }
        var jsonFIle = new File([JSON.stringify(ob)], "foo.json", {
            type: "application/json",
        });
        return jsonFIle
    }
    const generating10 = async () => {
        if( ! canvas ){
            return
        }
        var startTime, endTime;
        startTime = new Date();
        setgenerationProgress({ total: 100, current: 0, isdone: "no" });
        const zip = require('jszip')();
        let allmetadatas = []
        for (let i = 1; i <= 100; i++) {
            
            var generatedLayersArray = await generating10asds()
            var dataURL = canvas.current.toDataURL("image/png");

            //converting data url to file
            var file = await dataURLtoFile(dataURL, i + ".png")

            zip.file("assets/" + i + ".png", file);

            //showing image in the window
            imageref.current.src = dataURL

            //marking the progress
            setgenerationProgress({ total: 100, current: i, isdone: "pending" });

            //making matadata
            let singlemetadata = MetaDatamaker(generatedLayersArray, i)
            allmetadatas.push(singlemetadata)
            var jsonFIle = new File([JSON.stringify(singlemetadata)], "foo.json", {
                type: "application/json",
            });
            zip.file("metadata/" + i + ".json", jsonFIle);
        }
        //adding complete meta data to zip file
        zip.file("metadata/Metadata.json", getallmetadataJSON(allmetadatas));

        setgenerationProgress({ total: 100, current: 0, isdone: "yes" });
        zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, "example.zip");
        });

        getEndedtime(startTime, endTime)
    }


    useEffect(() => {
        //automatically start generating
        if (selectedPage == 2) {
            generating10()
        }
    }, [selectedPage]);


    const getProgressbarorcongradulation = () => {
        if (generationProgress.isdone == "yes") {
            return <><img style={{ width: "100px" }} src="/images/congratulations-png-22070.png" /> <br /> Your Images collection automatically downloaded!<br /> <p>Time Taken = {generationTime} seconds</p></>
        } else {
            return <ProgressBar generationProgress={generationProgress} />
        }
    }
    return <div className={classes.centerMainDiv}>
        <h2>Generate your NFT Collection!</h2>
        <div className={classes.formcolumnsHolder}>
            <div className={classes.singlecolumn}>
                <div style={{ width: "80%", height: "100%", marginLeft: "auto", marginRight: "auto", maxHeight: "300px" }} >
                    <img ref={imageref} />
                    <canvas style={{ marginLeft: "auto", marginRight: "auto", display: "none" }} id='canvasId' ref={canvas} width="200px" height="200px" />
                    <br />
                    <label > </label>
                    <br />
                </div>
            </div>
            <div className={classes.singlecolumn}>

                <div className={classes.singleInputController}>
                    <p>Generating your NFTs!</p>

                    {getProgressbarorcongradulation()}
                </div>



                <div style={{ display: "flex", flexDirection: "row", }}>
                    <div className={classes.btnsHolder}>
                        <Button className={classes.controllerbtns} onClick={() => generating10()}>
                            Generate
                        </Button>

                        <Button className={classes.controllerbtns} onClick={() => handleClose()} >
                            Close
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    </div>;
}
