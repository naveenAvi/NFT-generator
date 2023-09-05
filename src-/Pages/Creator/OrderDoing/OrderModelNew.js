import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import FirstPage from './FirstPage';
import ProjectName from './ProjectName';
import SecondPage from './SecondPage';


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
            flexDirection:"column"
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
    }
}));

export default function OrderModelNew({ _IndexDBCreate, _IndexDB, basicdetails, setprojectdata, setimageSettingsDialog, setgenerateorder, generateorder, images, LayersList, setLayersList, selectedPage, setSelectedPage, projectdata }) {
    const classes = userStyle();

    const handleOpen = () => setimageSettingsDialog(true);
    const [currentimagefile, setcurrentimagefile] = useState({});
    
    useEffect(() => {
        setSelectedPage("selectpackage")
        
    }, [generateorder]);

    const handleClose = () => {
        setgenerateorder(false);
    }
    
    const getPage = () => {
        switch (selectedPage) {
            case "selectpackage":
                return <FirstPage _IndexDBCreate={_IndexDBCreate} _IndexDB={_IndexDB} basicdetails={basicdetails} setprojectdata={setprojectdata} generateorder={generateorder} setgenerateorder={setgenerateorder} selectedPage={selectedPage} setSelectedPage={setSelectedPage} images={images} LayersList={LayersList} setLayersList={setLayersList}  projectdata={projectdata}/>
                break;
            case "generate100":
                return <SecondPage  _IndexDBCreate={_IndexDBCreate} _IndexDB={_IndexDB} setprojectdata={setprojectdata} generateorder={generateorder} setgenerateorder={setgenerateorder} selectedPage={selectedPage} setSelectedPage={setSelectedPage} images={images} LayersList={LayersList} setLayersList={setLayersList}  projectdata={projectdata}/>
                break;
            case "projectmeta":
                return <ProjectName _IndexDBCreate={_IndexDBCreate} _IndexDB={_IndexDB}  setprojectdata={setprojectdata} generateorder={generateorder} setgenerateorder={setgenerateorder} selectedPage={selectedPage} setSelectedPage={setSelectedPage} images={images} LayersList={LayersList} setLayersList={setLayersList}  projectdata={projectdata}/>
                break;
            default:
                break;
        }
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


            {getPage()}
        </Box>
    </Modal>;
}
