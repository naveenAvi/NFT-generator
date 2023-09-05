import { Button, IconButton, makeStyles, Tooltip, } from '@material-ui/core';
import { AddCircle, Info, Settings } from '@material-ui/icons';
import { useRef, useEffect, useState } from 'react';
import { Generatepreview } from '../Generator/Generator';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeletePro from '../Modals/DeletePro';


const userStyle = makeStyles((theme, responsive) => ({
    leftbar: {
        //width:theme.spacing(30),
        backgroundColor: "rgb(33, 33, 33)",
        height: "100vh",
        width: "92%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    singleLayer: {
        width: "95%",
        border: "2px solid black",
        marginBottom: "5px",
        paddingRight: "5px",
        backgroundColor: "#323549",
        borderRadius: "7px"

    },
    layerlist: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: (responsive) => responsive.layerlistheight + "px",
        overflowY: "scroll"
    },
    layermeta: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "5px"
    },
    layername: {
        whiteSpace: "nowrap",
        overflow: 'hidden',
        textOverflow: "----",
        width: "80%",
        color: "white"
    },
    layercenter: {
        paddingTop: "7px",
        paddingBottom: "7px",
        paddingLeft: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    belowbuttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "96%",
        marginLeft: "auto",
        marginRight: "auto",
        bottom: "0px"
    },
    singlebuttonbelow: {
        paddingLeft: "25px",
        paddingRight: "25px",
        paddingTop: "10px",
        paddingBottom: "10px",
        border: "1px solid #f4d47c",
        color: "white",
        borderRadius: "5px"

    },
    projectsettings: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    projectinputbox: {
        padding: '8px 8px',
        margin: ' 5px 0',
        boxSizing: 'border-box',
        width: "100%",
        backgroundColor: "transparent",
        border: "1px solid #5791f0",
        borderRadius: "4px",
        color: "white"
    },
    layernameinput: {
        padding: '5px 5px',
        boxSizing: 'border-box',
        backgroundColor: "transparent",
        border: "1px solid #5791f0",
        color: "white"
    },
    layerimagecount: {
        color: "white",
        marginLeft: "5px",
        backgroundColor: "rgb(33, 33, 33)"
    },
    layerrareness: {
        color: "white",
        marginLeft: "4px"
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
    headername: {
        marginBottom: "10px",
        marginTop: "10px"
    }
}));
export default function LayerBar({ setSelectedPage, projectdata, setprojectdata, LayersList, setLayersList, setSelectedLayer, selectedLayer, images, setgeneratedPreview, setlayerSettingsDialog, setgenerateorder, setImages }) {

    const LayersListComponent = useRef();
    const [responsive, setResponsive] = useState({})
    const [reset, setreset] = useState({display:false})

    function makeresponsive() {
        //responsive
        const { y } = LayersListComponent.current.getBoundingClientRect()

        setResponsive((prevState) => (
            { ...prevState, layerlistheight: (window.innerHeight - (y + 60)) })
        )

    }
    useEffect(() => {
        makeresponsive()

    }, [LayersList, selectedLayer]);
    /*
        useEffect(() => {
            const { y } = LayersListComponent.current.getBoundingClientRect()
    
            setResponsive((prevState) => (
                { ...prevState, layerlistheight: (window.innerHeight - (y + 60)) })
            )
        });*/

    const classes = userStyle(responsive);

    const changeprojectname = (projectname) => {
        setprojectdata((prevState) => (
            { ...prevState, projectName: projectname, }))
    }
    const changeprojectwidth = (width) => {
        setprojectdata((prevState) => (
            { ...prevState, projectwidth: width, }))
    }
    const changeprojectheight = (height) => {
        setprojectdata((prevState) => (
            { ...prevState, projectheight: height, }))
    }


    const setSelected = (layerid) => {
        setSelectedLayer(layerid)
    }
    const inputRef = useRef();

    const openLayersettingsModel = (Layer) => {
        setlayerSettingsDialog(Layer);
    }
    const genera = () => {
        //from Generator/Generator Page
        Generatepreview(images, LayersList, setLayersList, setgeneratedPreview)
    }


    const addtoList = () => {
        if (inputRef.current.value == "") {
            return false
        }
        const maxlayerposition = LayersList.reduce(function (prev, current) {
            return (prev.layerposition > current.layerposition) ? prev : current
        }) //returns object

        const maxlayerID = LayersList.reduce(function (prev, current) {
            return (prev.layerid > current.layerid) ? prev : current
        }) //returns object

        let tempvcar = { layerposition: (maxlayerposition.layerposition + 1), layerid: (maxlayerID.layerid + 1), layername: inputRef.current.value, imagescount: 0, layerrarity: 100, toselectNext: 0 }
        setLayersList((prevState) => (
            [...prevState, tempvcar]))
        inputRef.current.value = ""
        setSelectedLayer(maxlayerID.layerid + 1)
    }
    const inputEnterPressed = (key) => {
        if (key == 13) {
            addtoList()
        }
    }

    const getLayersList = () => {
        let lis = LayersList.map((Layer, index) => (
            <Draggable draggableId={Layer.layerid.toString()} key={Layer.layerid.toString()} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div style={{ border: (selectedLayer == Layer.layerid ? "2px solid #bebebe" : "2px solid black") }} className={classes.singleLayer} key={Layer.layerid} onClick={() => setSelected(Layer.layerid)}>
                            <div className={classes.layercenter}>
                                <div className={classes.layername}>
                                    {Layer.layername}
                                </div>
                                <div className={classes.layermeta}>
                                    <div className={classes.layerimagecount}>
                                        {Layer.imagescount}
                                        {/*Layer.layerid*/}
                                    </div>
                                    <div className={classes.layerrareness} onClick={() => openLayersettingsModel(Layer)}>
                                        <Settings />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>)

        )
        return lis
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = (result) => {
        if (result == null) {
            return false
        }
        //console.log(result)
        /*var templayers = LayersList
        var temparr = arraymove(templayers, result.source.index, result.destination.index )
*/
        var templayers = LayersList
        //console.log(reorder(templayers, result.source.index, result.destination.index))
        setLayersList(reorder(templayers, result.source.index, result.destination.index))
    }

    const generateorder = () => {

        if ((projectdata.paid === true) && (projectdata.projectID) && (projectdata.projectToken) && (projectdata.uploaded !== "uploadcomplete")) {
            setgenerateorder(true)
            setSelectedPage("uladoigpaid")
        } else if (projectdata.uploaded === "uploadcomplete") {
            setgenerateorder(true)
            setSelectedPage("doneupload")
        } else {
            setgenerateorder(true)
            setSelectedPage("selectpackage")
        }
    }
    return (
        <div className={classes.leftbar}>
            <div style={{ width: "80%", display: "flex" }} >
                <img onLoad={() => makeresponsive()} src="images/logoo.png" style={{ width: "50px" }} />
                <h2>Generate-nft.xyz</h2>
            </div>
            <div className={classes.projectsettings}>
                <h3 className={classes.headername}>Project Settings</h3>
                <IconButton onClick={()=> setreset({ display:true }) }>
                <svg style={{ width:"25px", color:"white", fill:"white" }} version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
                    <metadata> Reset Project </metadata>
                    <g><path d="M143.6,500H10l178.2,178.2L366.4,500H232.7c0-147.4,119.8-267.3,267.3-267.3c45,0,87.8,11.1,124.7,31.2l65-65C635,164.1,569.9,143.6,500,143.6C303.1,143.6,143.6,303.1,143.6,500L143.6,500z M767.3,500c0,147.4-119.8,267.3-267.3,267.3c-45,0-87.8-11.1-124.7-31.2l-65,65c54.8,34.7,119.8,55.2,189.8,55.2c196.9,0,356.4-159.5,356.4-356.4H990L811.8,321.8L633.6,500H767.3L767.3,500z" /></g>
                </svg>
                </IconButton>
                
            </div>

            <div>
                <label className={classes.projectlabelName}>Project Name </label>
                <div>
                    <input className={classes.projectinputbox} value={projectdata.projectName} onChange={(e) => changeprojectname(e.currentTarget.value)} type='text' />
                </div>
            </div>

            <div>
                <label className={classes.projectlabelName}>Image Size</label>
                <div className={classes.rowedinputs} >
                    <div className={classes.rowedinputssingle} >
                        <input style={{ width: "100%" }} value={projectdata.projectwidth} className={classes.projectinputbox} onChange={(e) => changeprojectwidth(e.currentTarget.value)} type='text' />
                    </div>
                    <div className={classes.rowedinputssingle} >
                        <input style={{ width: "100%" }} value={projectdata.projectheight} className={classes.projectinputbox} onChange={(e) => changeprojectheight(e.currentTarget.value)} type='text' />
                    </div>
                </div>
            </div>


            <div>
                <h3 className={classes.headername}>Layers <Tooltip title="Add your Image layers here (eg: Heads, Eyes, Ears, Hair styles, Clothes) Click Settings icon to view settings"><Info /></Tooltip>  </h3>
            </div>
            <div className={classes.layerlist} ref={LayersListComponent}>
                <DragDropContext onDragEnd={onDragEnd} >
                    <Droppable droppableId='layers'>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ width: "100%" }}
                            >

                                {getLayersList()}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div style={{ width: "100%" }}>
                    <div className={classes.singleLayer}>
                        <div className={classes.layercenter}>
                            <input type="text" ref={inputRef} className={classes.layernameinput} style={{ width: "100%" }} placeholder='New Layer Name' onKeyDown={(e) => inputEnterPressed(e.keyCode)}>

                            </input>
                            <div className={classes.layermeta} onClick={() => addtoList()}>
                                <AddCircle style={{ marginRight: "5px", cursor: "pointer" }} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={classes.belowbuttons}>
                <Button className={classes.singlebuttonbelow} onClick={() => genera()} >Preview</Button>

                <Button className={classes.singlebuttonbelow} style={{ marginLeft: "10px" }} onClick={() => generateorder()}>
                    Generate
                </Button>
            </div>


            <DeletePro setreset={setreset} reset={reset} setLayersList={setLayersList} setprojectdata={setprojectdata} setImages={setImages} setgenerateorder={setgenerateorder} />
        </div>
    )
}