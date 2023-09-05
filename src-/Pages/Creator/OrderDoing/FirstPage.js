import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { addEmailToList } from '../../../Axios/AxiosReq';
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
        color: "white"
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
    }
}));


export default function FirstPage({  _IndexDBCreate, _IndexDB, basicdetails, setprojectdata, generateorder, setgenerateorder, electedPage, setSelectedPage, images, LayersList, setLayersList, projectdata }) {
    const classes = userStyle();
    const canvas = useRef(null)
    const collectionsize = useRef(null)
    const [emailaddress, setemailaddress] = useState({})
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
        if (email === "") {
            setemailaddress("enter")
            return false
        } else {
            setemailaddress("ok")
            return true
        }
    }

    const handlenext = () => {
        let isemailvalid = emailvalidity(projectdata.emailaddress)
        if (!isemailvalid) {
            return
        }
        if (!basicdetails.Packages) { return }
        let selectedpa = basicdetails.Packages.filter(item => parseInt(item.imagecount) === parseInt(collectionsize.current.value))[0]
        
        addEmailToList( projectdata.emailaddress )

        console.log(basicdetails,  selectedpa, parseInt(collectionsize.current.value) )

        if (!selectedpa) { return }
        if (selectedpa.price === 0) {
            setSelectedPage("generate100")
        } else {
            if( projectdata.projectName === "" ){
                setSelectedPage("projectmeta")
            }else{
                //setSelectedPage("uladoigpaid")
                setSelectedPage("payment")
            }
        }
    }

    const changeordersize = (newordersize) => {
        setprojectdata((prevState) => (
            { ...prevState, ordersize: newordersize, }))
    }
    const changeemail = (newordersize) => {
        setprojectdata((prevState) => (
            { ...prevState, emailaddress: newordersize, }))
    }
    return <div className={classes.centerMainDiv}>
        <h2>Generate your NFT Collection!</h2>
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
                    <p>Enter your Email Address</p>
                    <label>We will send your an email when things done.</label>
                    <input placeholder='someone@email.com' className={classes.singleInputText} onChange={(e) => changeemail(e.currentTarget.value)} value={projectdata.emailaddress} style={{ border: (emailaddress == "ok" ? "1px solid green" : "1px solid red") }} type="email" />
                    {emailaddress === "enter" ?
                        <label style={{ color: (emailaddress === "enter" ? "red" : "white") }}>Please enter an email address</label>
                        :
                        ""}
                </div>

                <div className={classes.singleInputController}>
                    <p>Collection Size</p>
                    <select ref={collectionsize} onChange={(e) => changeordersize(e.currentTarget.value)} className={classes.singleInputText}>
                        {(basicdetails.Packages ? basicdetails.Packages.map(item =>
                            <option className={classes.singleselectoption} value={item.imagecount}>{item.imagecount} collection ( {item.price === 0 ? "free" : item.price + " " + item.currency} )</option>
                        ) : "")}
                    </select>
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
