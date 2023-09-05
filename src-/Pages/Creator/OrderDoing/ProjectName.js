import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { NewGenerator } from '../GenerateOrder/NewGenerator2';
import { Generatepreview } from '../Generator/Generator';
import { ImagesUpload } from '../Upload/ImagesUpload';

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
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center"
        },
    },
    singlecolumn: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
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
    errorsingleInputText: {
        padding: '8px 8px',
        margin: ' 5px 0',
        boxSizing: 'border-box',
        width: "100%",
        backgroundColor: "transparent",
        border: "1px solid red",
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
    rowedinputs: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: 'space-between'
    },
    rowedinputssingle: {
        width: "45%",

    },
}));


export default function ProjectName({ _IndexDBCreate, _IndexDB, basicdetails, setprojectdata, generateorder, setgenerateorder, electedPage, setSelectedPage, images, LayersList, setLayersList, projectdata }) {
    const classes = userStyle();
    const canvas = useRef(null)
    const collectionsize = useRef(null)
    const [proName, setproName] = useState({})
    const [generatedPreview, setgeneratedPreview] = useState({})
    const handleClose = () => {
        setgenerateorder(false);
    }
    const generatetempprev = async () => {
        var generatedLayersArray = Generatepreview(images, LayersList, setLayersList, setgeneratedPreview)
        //we are directly providing NewGenerator the generatedLayersArray
        var result = await NewGenerator( _IndexDBCreate, _IndexDB, images, LayersList, setLayersList, setgeneratedPreview, generatedLayersArray, canvas)
        //console.log("hello")
    }
    useEffect(() => {
        generatetempprev()
    }, [generateorder]);
    const emailvalidity = (email) => {
        if (email == "") {
            setproName("enter")
            return false
        } else {
            setproName("ok")
            return true
        }
    }

    const handlenext = () => {
        
        let isemailvalid = emailvalidity(projectdata.projectName)
        if (!isemailvalid) {
            return
        }
        
        setSelectedPage("uladoigpaid")
        
    }

    const changeordersize = (newordersize) => {
        setprojectdata((prevState) => (
            { ...prevState, ordersize: newordersize, }))
    }
    const changeName = (newName) => {
        setprojectdata((prevState) => (
            { ...prevState, projectName: newName, }))
    }
    const changeWidth = (width) => {
        setprojectdata((prevState) => (
            { ...prevState, projectwidth: width, }))
    }
    const changeHeight = (newheight) => {
        setprojectdata((prevState) => (
            { ...prevState, projectheight: newheight, }))
    }

    return <div className={classes.centerMainDiv}>
        <h2>Project Data</h2>
        <div className={classes.formcolumnsHolder}>
            <div className={classes.singlecolumn}>
                <div style={{ width: "80%", height: "100%", marginLeft: "auto", marginRight: "auto", maxHeight: "300px" }} >
                    <canvas style={{ marginLeft: "auto", marginRight: "auto" }} id='canvasId' ref={canvas} width="200px" height="200px" />
                    <br />
                    <label > </label>

                    <br />

                </div>

            </div>
            <div className={classes.singlecolumn}>
                <div className={classes.singleInputController}>
                    <label>Please Enter a name for your project</label>
                    <input placeholder='ex: Cyber punk' className={classes.singleInputText} onChange={(e) => changeName(e.currentTarget.value)} value={projectdata.projectName} style={{ border: (proName == "ok" ? "1px solid green" : "1px solid red") }} type="email" />
                    {proName === "enter" ?
                        <label style={{ color: (proName === "enter" ? "red" : "white") }}>Please enter a cool name</label>
                        :
                        ""}
                </div>

                <div className={classes.singleInputController}>
                    <div className={classes.rowedinputs} >
                        <div className={classes.rowedinputssingle} >
                            <label>Width(optional)</label>
                            <input style={{ width: "100%" }} value={projectdata.projectwidth} className={classes.singleInputText}  onChange={(e) => changeWidth(e.currentTarget.value)}  type='text' />
                        </div>
                        <div className={classes.rowedinputssingle} >
                            <label>Height(optional)</label>
                            <input style={{ width: "100%" }} value={projectdata.projectheight} className={classes.singleInputText} onChange={(e) => changeHeight(e.currentTarget.value)}  type='text' />
                        </div>
                    </div>
                </div>


                <div style={{ display: "flex", flexDirection: "row", }}>
                    <div className={classes.btnsHolder}>
                        <Button className={classes.controllerbtns} onClick={() => handlenext()}>
                            Next <ArrowRight />
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
