import { Button, makeStyles, } from '@material-ui/core';
import { AddCircle, Settings } from '@material-ui/icons';
import { useRef } from 'react';
import { Generatepreview } from '../Generator/Generator';


const userStyle = makeStyles((theme) => ({
    leftbar: {
        color: "red",
        //width:theme.spacing(30),
        backgroundColor: "yellow",
        height:"100vh",
        width:"92%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    singleLayer: {
        width: "95%",
        border: "2px solid black",
        marginBottom: "5px",
        paddingRight: "5px"

    },
    layerlist: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height:"calc(100vh - 100px)",
        
        
    },
    layermeta: {
        display: "flex",
        flexDirection: "row",
        alignItems:"center"
    },
    layername: {


    },
    layercenter: {
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingLeft: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    layerrareness: {
        backgroundColor: "green",
        marginLeft: "3px"
    },
    belowbuttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "96%",
        marginLeft: "auto",
        marginRight: "auto",
        bottom:"0px"
    },
    singlebuttonbelow: {
        paddingLeft: "25px",
        paddingRight: "25px",
        paddingTop: "10px",
        paddingBottom: "10px",
        border: "1px solid black"
    }
}));
export default function LayerBar({ LayersList, setLayersList, setSelectedLayer, selectedLayer, images, setgeneratedPreview }) {
    const classes = userStyle();

    const setSelected = (layerid) =>{
        setSelectedLayer(layerid)
    }
    const inputRef = useRef();

    const genera = () =>{
        Generatepreview(images, LayersList, setLayersList, setgeneratedPreview)
    }

    const addtoList = () =>{
        const maxlayerposition = LayersList.reduce(function(prev, current) {
            return (prev.layerposition > current.layerposition) ? prev : current
        }) //returns object

        const maxlayerID = LayersList.reduce(function(prev, current) {
            return (prev.layerid > current.layerid) ? prev : current
        }) //returns object

        let tempvcar = {layerposition:(maxlayerposition.layerposition + 1), layerid: ( maxlayerID.layerid + 1 ), layername:inputRef.current.value, imagescount:30, avaeragerarity: 80, toselectNext : 0 }
        setLayersList((prevState) => (
            [...prevState, tempvcar ]))
            inputRef.current.value = ""
    }

    //console.log( selectedLayer )
    const getLayersList = LayersList.map((Layer) => (
        <div style={{ border: ( selectedLayer == Layer.layerid ? "3px solid red" : "none" ) }} className={classes.singleLayer} key={Layer.layerid} onClick={ ()=> setSelected (Layer.layerid) }>
            <div className={classes.layercenter}>
                <div className={classes.layername}>
                    {Layer.layername}
                </div>
                <div className={classes.layermeta}>
                    <div className={classes.layerimagecount}>
                        {Layer.imagescount}
                    </div>
                    <div className={classes.layerrareness}>
                        <Settings />
                    </div>
                </div>
            </div>
        </div>
    ))
    return (
        <div className={classes.leftbar}>
            <div>
                Logo goes here
            </div>
            <div>
                <h2>Layers</h2>
            </div>
            <div className={classes.layerlist}>
                {getLayersList}
            
                <div className={classes.singleLayer}>
                    <div className={classes.layercenter}>
                        <input type="text" ref={inputRef} className={classes.layername} placeholder='New Layer Name'>

                        </input>
                        <div className={classes.layermeta} onClick={ ()=> addtoList()}>
                            <AddCircle style={{ marginRight: "5px" }} />
                        </div>
                    </div>
                </div>


            </div>

            <div className={classes.belowbuttons}>
                <Button  className={classes.singlebuttonbelow} onClick={()=>genera ()} >Preview</Button>
                
                <div className={classes.singlebuttonbelow}>
                    Generate
                </div>
            </div>
        </div>
    )
}