import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import All from '../../Preview/Preview/All';
import { getImage } from '../Db/StoreDb';
import { Generatepreview } from '../Generator/Generator';

const userStyle = makeStyles((theme, responsive) => ({
    centerBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        maxHeight: "100%",
        border: '2px solid #000',
        color: "black",
        backdropFilter: "blur(5px)",
        backgroundColor: "white",
        overflowY: "scroll",
        padding: "20px",
        [theme.breakpoints.down("sm")]: {
            padding: "5px",
            width: "97%",
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

export default function Payments({ setprojectdata, projectdata, setimageSettingsDialog, setgenerateorder, generateorder, images, LayersList, setLayersList, selectedPage, setSelectedPage }) {
    const classes = userStyle();

    const handleOpen = () => setimageSettingsDialog(true);
    const [currentimagefile, setcurrentimagefile] = useState({});

    const handleClose = () => {
        setSelectedPage(1)
        setgenerateorder(false);
    }
    //alert(navigator.deviceMemory)

    //console.log(window.performance.memory)

    const getPage = () => {
        switch (selectedPage) {
            case 1:

            default:
                break;
        }
    }

    const getamount = () => {
        if (projectdata.ordersize == 1000) {
            return 60
        } else if (projectdata.ordersize == 10000) {
            return 120
        }
    }
    async function addpaymentdata() {
        const db = getFirestore();
        try {
            /*const docRef = await addDoc(collection(db, "userpayments"), {
                projectID: projectdata.projectid,
                emailaddress: projectdata.emailaddress,
                collectionsize: projectdata.ordersize
            });*/

            setSelectedPage("uladoigpaid")
            setprojectdata((prevState) => (
                { ...prevState, paid: true, }));

            //console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            //console.error("Error adding document: ", e);
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
            <h1>
                Generate your NFT collection!
            </h1>
            <h2>{projectdata.ordersize} images collection at ${getamount()}.00</h2>

            <PayPalButton
                shippingPreference="NO_SHIPPING"
                amount="0.01"
                currency="USD"
                options={{
                    clientId:
                        "AbnGQhXXoM8lUzv_SDyaX-4_5SOm25M2y2W7o8kZQ9VzxQycT2Qmr2xES0oFlKzDEmTqpPSZd38KzL9U"
                }}
                onSuccess={(details, data) => {

                    addpaymentdata()

                    //console.log("Details---------->", details);
                    //console.log("Data------------->", data);
                }}
            />
        </Box>
    </Modal>;
}
