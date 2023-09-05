import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Input, makeStyles,  } from '@material-ui/core';

const userStyle = makeStyles((theme) => ({
    dropbox:{
        width:"100%",
        border:"1px solid black",
        height:"100px",
        textAlign:"center",
        paddingBottom: "10px",
        marginLeft:"auto",
         marginRight:"auto",
         cursor:"pointer"
    }
}));


export default function DropHere({ images, setImages, selectedLayer }) {
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

        function addtoSetimages(filesdata){
            
        }

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setImages(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        selectedLayer:selectedLayer
                    })
                )
            )
            
        },
    })
    const imagespreview = images.map((file) => (
        localStorage.setItem(file.name,file.preview ),
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
                <p>Drop files here</p>
                <p>Or click here to select files you want to upload</p>
                <p> png / jpg / jpeg are allowed  </p>
            </div>
            <div>{imagespreview}</div>

            <div>
                <img src={ localStorage.getItem("image1")} style={{ width: "200px" }} alt="preview" />
            </div>
        </div>
    )
}