import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Input, makeStyles, } from '@material-ui/core';
import { AddImageData } from "../Db/StoreDb";

const userStyle = makeStyles((theme) => ({
    dropbox: {
        width: "95%",
        border: "1px solid #5791f0",
        boxShadow: "0px 0px 5px 0px #5791f0",
        textAlign: "center",
        paddingBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        cursor: "pointer",
        borderRadius: "5px",
        marginTop: "20px"
    },
    dropzonedescription:{
        marginTop:"4px",
        marginBottom:"4px"
    }
}));


export default function DropHere({_IndexDBCreate, _IndexDBData, _IndexDB,  images, setImages, selectedLayer, LayersList, setLayersList }) {
    const classes = userStyle();
    const [files, setFiles] = useState([]);

    //console.log(images )

    /*
        const { getRootProps, getInputProps } = useDropzone({
            accept: "image/*",
            onDrop: (acceptedFiles) => {
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                )
            },
        })
        const images = files.map((file) => (
            localStorage.setItem(file.name,file.preview ),
            <div key={file.name}>
                <div>
                    <img src={file.preview} style={{ width: "200px" }} alt="preview" />
                </div>
            </div>
        ))
    */

    function addtoSetimages(filesdata) {
        let MaxImageID = 0;
        if (images.length > 0) {
            MaxImageID = images.reduce(function (prev, current) {
                return (prev.imageID > current.imageID) ? prev : current
            }) //returns object
            if (MaxImageID) {
                MaxImageID = MaxImageID.imageID + 1
            }
        }

        for (let i = 0; i < filesdata.length; i++) {
            const singlefiole = filesdata[i];
            var temperr = {
                imageID: (MaxImageID + i),
                layerid: selectedLayer,
                ImageName: "",
                rarity: 100,
                preview: singlefiole.preview,
                filename: singlefiole.name,
                filetype: singlefiole.type,
                dexieID:singlefiole.dexieID
            }
            //console.log(singlefiole.base64)
            setImages((prevState) => (
                [...prevState, temperr,])
            )
        }
        let templayerslist = [...LayersList]
        for (let i = 0; i < templayerslist.length; i++) {
            const layer = templayerslist[i];
            if (layer.layerid == selectedLayer) {
                templayerslist[i].imagescount = templayerslist[i].imagescount + filesdata.length
            }
        }
        setLayersList(templayerslist)


        //console.log( filesdata )
    }
    function loadXHR(url) {
        return new Promise(function (resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.onerror = function () { reject("Network error.") };
                xhr.onload = function () {
                    if (xhr.status === 200) { resolve(xhr.response) }
                    else { reject("Loading error:" + xhr.statusText) }
                };
                xhr.send();
            }
            catch (err) { reject(err.message) }
        });
    }
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }


    const addimages = (file) => {
        var uniueid = 0;
        for (let i = 0; i < 30; i++) {
            uniueid = makeid(6);

            let currentss = localStorage.getItem('identities')
            if (currentss) {
                if (!currentss.includes(uniueid)) {
                    localStorage.setItem('identities', localStorage.getItem('identities') + uniueid)
                    i = 100
                }
            }else{
                localStorage.setItem('identities', uniueid)
            }
        }
        var db = AddImageData( _IndexDBCreate, _IndexDB, file, uniueid)
        return uniueid;
    }
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            addtoSetimages(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        //base64: getBase64(file),
                        dexieID: addimages(file),
                        preview: URL.createObjectURL(file),
                    })
                )
            )

        },
    })
    const imagespreviefffw = images.map((file) => (
        //console.log( "name" + file.name ),
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: "200px" }} alt="preview" />
            </div>
        </div>
    ))

    const imagespreview = images.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: "200px" }} alt="preview" />
            </div>
        </div>
    ))
    return (
        <div className={classes.dropbox}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={classes.dropzonedescription}>Drop files here</div>
                <div className={classes.dropzonedescription}>Or click here to select files you want to upload</div>
                <div className={classes.dropzonedescription}> png / jpg / jpeg are allowed  </div>
            </div>


        </div>
    )
}


