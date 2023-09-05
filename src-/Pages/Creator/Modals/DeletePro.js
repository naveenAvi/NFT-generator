import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react'
import { clearImagesData } from '../Db/StoreDb';


const userStyle = makeStyles((theme, responsive) => ({
    centerBox: {
        backgroundColor: 'rgb(33, 33, 33)',
        border: '2px solid #000',
        color: "white",
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

export default function DeletePro({ setreset, reset, setLayersList, setprojectdata, setImages, setgenerateorder  }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const classes = userStyle( )
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setreset({ display:false });
    };

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
        setreset({ display:false });
    }
  
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={reset.display}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className={ classes.model }
        >
          <DialogTitle id="responsive-dialog-title" className={ classes.centerBox }>
            Do you want to reset project?
          </DialogTitle>
          <DialogContent className={ classes.centerBox }>
            <DialogContentText style={{ color:'white' }}>
              All of the images that you uploaded and all layers and their settings will be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions className={ classes.centerBox }>
            <Button autoFocus onClick={handleClose} style={{ color:'white' }}>
              Cancel
            </Button>
            <Button onClick={() => resetworkarea() } autoFocus style={{ color:'white', backgroundColor:"red" }}>
              Confirm!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }