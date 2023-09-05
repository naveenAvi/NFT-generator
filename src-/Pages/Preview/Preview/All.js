import { Box, Button, Grid, Input, makeStyles, MenuItem, Modal, Select, Slider, } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { ArrowDownward, ArrowRight, ArrowUpward, CloseOutlined, CloseRounded, Image } from '@material-ui/icons';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { storage } from '../../Creator/Upload/Upload';

const userStyle = makeStyles((theme, responsive) => ({

}));


export default function All({ generateorder, setgenerateorder, electedPage, setSelectedPage, images, LayersList, setLayersList }) {
    const [image, setimage] = useState(null)

    const handlechange = e => {
        if (e.target.files[0]) {
            setimage(e.target.files[0])
        }
    }

    const handupload = e => {
        const storageRef = ref(storage, 'some-child');

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, image).then((snapshot) => {
          //console.log('Uploaded a blob or file!');
        });
    }

    //console.log("image", image)
    return <div >
        <h2>Generate your NFT Collection!</h2>
        <input type="file" onChange={handlechange} />
        <button onClick={handupload}>Upload</button>
    </div>;
}
