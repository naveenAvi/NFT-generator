import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { createNewProject, uploadImages } from '../../../Axios/AxiosReq';
import { getImage } from '../Db/StoreDb';
import ProgressBar from '../GenerateOrder/ProgressBar';

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

export default function UploadPageNew({_IndexDBCreate, _IndexDB, images, setgenerateorder, generateorder, projectdata, selectedPage, setprojectdata, setSelectedPage, LayersList }) {
    const classes = userStyle();
    const [controllingprogress, setcontrollingprogress] = useState(-10)
    const [failedImages, setfailedImages] = useState([])
    const [isuploadingFailed, setisuploadingFailed] = useState(false)
    const [retrycount, setretrycount] = useState(0)
    const [errors, seterrors] = useState("")
    const [generationProgress, setgenerationProgress] = useState({
        totalbytes: 0,
        uploadedbytes: 0,
        total: 0,
        current: 0,
        isdone: "no",
        projectid: ""
    })

    const handleClose = () => {
        setgenerateorder(false);
    }

    async function uploadFaileds() {
        setgenerationProgress((previousestate) => ({ ...previousestate, current: 0, total: failedImages.length }));
        setretrycount(retrycount + 1)
        setisuploadingFailed(true)
        for (let i = 0; i < failedImages.length; i++) {
            const singleFailed = failedImages[i];
            try {
                let imageuploadresults = await uploadImages(singleFailed);
                console.log( failedImages, singleFailed )
                //console.log(imageuploadresults)
                if (imageuploadresults.data) {
                    if (imageuploadresults.data.images === 'uploaded') {
                        setgenerationProgress((previousestate) => ({ ...previousestate, current: previousestate.current + 1 }));
                        setfailedImages(failedImages.filter(failedim => failedim !== singleFailed))
                    } 
                } 

            } catch (error) {
               
                console.log(error)
            }
        }
        setisuploadingFailed(false)
    }
    //console.log(window.performance.memory)
    async function uploadingma() {
        console.log("hello")
        //if (selectedPage == 5) {
        let projectdataresponse = await createNewProject(projectdata);

        if (!projectdataresponse.data) {
            //no internet connection or server serror
            seterrors("some error occured please try again or contact us")
            return
        }

        if (projectdataresponse.data.stat === 200) {
            console.log( "hello" )
            setprojectdata((previouseState) => ({ ...previouseState, projectID: projectdataresponse.data.projectID, projectToken: projectdataresponse.data.projectToken }))

            //uploading images
            let imagelist = await getImage( _IndexDBCreate, _IndexDB, );

            setgenerationProgress({
                totalbytes: 0,
                uploadedbytes: 0,
                total: imagelist.length,
                current: 0,
                isdone: "no",
                projectid: ""
            })
            for (let i = 0; i < imagelist.length; i++) {
                const element = imagelist[i];
                const imagemeta = images.filter(img => img.dexieID === element.imgname)[0]

                if (imagemeta) {
                    const layer = LayersList.filter(lay => lay.layerid === imagemeta.layerid)[0]
                    let fd = new FormData();

                    fd.append("image", element.img)
                    fd.append("imagename", element.imgname)
                    fd.append("filename", imagemeta.filename)
                    fd.append("projectID", projectdataresponse.data.projectID)
                    fd.append("projectToken", projectdataresponse.data.projectToken)
                    fd.append("layername", (layer ? layer.layername : "not found"))
                    fd.append("rarity", imagemeta.rarity)
                    fd.append("layerid", imagemeta.layerid)
                    fd.append("addedName", imagemeta.ImageName)
                    fd.append("imageid", element.imageID)
                    try {
                        let imageuploadresults = await uploadImages(fd);
                        //console.log(imageuploadresults)
                        if (!imageuploadresults.data) {
                            setfailedImages(prevArray => [...prevArray, fd]);
                            
                        }else if (imageuploadresults) {
                            if (imageuploadresults.data.images === 'uploaded') {
                                setgenerationProgress((previousestate) => ({ ...previousestate, current: previousestate.current + 1 }));

                            } else {
                                setfailedImages(prevArray => [...prevArray, fd]);
                            }
                        } else {
                            setfailedImages(prevArray => [...prevArray, fd]);
                        }

                    } catch (error) {
                        setfailedImages(prevArray => [...prevArray, fd]);
                        console.log(error)
                    }
                }
            }
        }else{
            seterrors("Can't connect to the server. Please try again")
        }

        /*if( generationProgress.isdone == "uploaded" ){
            console.log( generationProgress )
            setSelectedPage(6)
        }else if( proid ){
            console.log("uploading images")
            await ImageData(projectdata, images, setgenerationProgress, LayersList)
            await ImagesUpload(projectdata, generationProgress, setgenerationProgress, controllingprogress, setcontrollingprogress, setSelectedPage)
        }*/
        //}
    }
    useEffect(() => {
        if (generationProgress.current !== 0) {
            if (generationProgress.current === generationProgress.total) {
                //no failed items
                setprojectdata((previouseState) => ({ ...previouseState, uploaded: "uploadcomplete" }))
                setSelectedPage("doneupload")
            } else if ((generationProgress.current + failedImages.length) === generationProgress.total) {
                //has failed items

            }
        } else {

        }
        console.log(failedImages)
    }, [generationProgress.current]);

    useEffect(() => {
        //setgenerationProgress({ total: 100, current: 0, isdone: "no" });
        uploadingma()
    }, []);


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
                <p>{Math.round(generationProgress.current)} / {Math.round(generationProgress.total)} Images Uploaded. <p style={{ color:"red" }}>{failedImages.length > 0 ? failedImages.length + " failed to upload": "" }</p> </p>
                <p>Do not close this window until all the images uploaded!</p>
                <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
                    <p>Your order id: #{projectdata.projectID} </p>
                    <p style={{ color:"red" }}>{errors}</p>
                    {((generationProgress.current + failedImages.length) >= generationProgress.total) ?
                        failedImages.length !== 0 ? <Button style={{ backgroundColor: "red", color: "white" }} disabled={isuploadingFailed} onClick={() => uploadFaileds()}>Failed to upload ( Retry {retrycount} )</Button> : ""
                        : ""}
                </div>

            </div>
        </Box>
    </Modal>;
}
