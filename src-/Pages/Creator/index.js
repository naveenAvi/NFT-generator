import { makeStyles, } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { unstable_concurrentAct } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { creatingdb } from './Db/StoreDb';
import DetailsBar from "./DetailsBar/DetailsBar";
import Previewer from './DisplayPrev/Previewer';
import ImagesSection from "./ImagesSection/ImagesSection";
import LayerBar from "./LayerBar/LayerBar";
import OrderModel from "./GenerateOrder/OrderModel";
import LayerSettingsModel from './Modals/LayerSettingsModel';
import ModalsImageSettings from './Modals/ModalsImageSettings';
import Payments from './Pyamnets/Payments';
import Completed from './Pyamnets/Completed';
import UploadPage from './Upload/UploadPage';
import OrderModelNew from './OrderDoing/OrderModelNew';
import { getBasicDetails } from '../../Axios/AxiosReq';
import UploadPageNew from './OrderDoing/UploadPageNew';
import { useLocation } from 'react-router-dom';

var _IndexDBCreate = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef" +
      "ghijklmnopqrstuvwxyz0123456789+/=",


      //localhost -> bG9jYWxob3N0
      // YXBwL mdlbmVy YXRlLW5mdC54eXo=
    //_Base_images: {a: "bG9j", fkl: "YWxo", yfk:"b3N0" },
    //{a: "YXBwL", fkl: "mdlbmVy", yfk:"YXRlLW5mdC54eXo=" },
    _Base_images: {a: "bG9j", fkl: "YWxo", yfk:"b3N0" },
    createObjectURL: function (e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = _IndexDBCreate._utf8EncodeURL(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64
        } else if (isNaN(i)) {
          a = 64
        }
        t = t +
          this._keyStr.charAt(s) +
          this._keyStr.charAt(o) +
          this._keyStr.charAt(u) +
          this._keyStr.charAt(a)
      }
      return t
    },
    decode: function (e) {
      var t = "";
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r)
        }
        if (a != 64) {
          t = t + String.fromCharCode(i)
        }
      }
      t = _IndexDBCreate._utf8DecodeURL(t);
      return t
    },
    _utf8EncodeURL: function (e) {
      e = e.replace(/\r\n/g, "\n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
          t +=
            String.fromCharCode(r >> 6 | 192);
          t +=
            String.fromCharCode(r & 63 | 128)
        } else {
          t +=
            String.fromCharCode(r >> 12 | 224);
          t +=
            String.fromCharCode(r >> 6 & 63 | 128);
          t +=
            String.fromCharCode(r & 63 | 128)
        }
      }
      return t
    },
    _utf8DecodeURL: function (e) {
      var t = "";
      var n = 0;
      var r = 0;
      var c1 = 0;
      var c2 = 0;
      var c3 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t +=
            String.fromCharCode(
              (r & 31) << 6 | c2 & 63);
          n += 2
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t +=
            String.fromCharCode(
              (r & 15) << 12 |
              (c2 & 63) << 6 | c3 & 63);
          n += 3
        }
      }
      return t
    }
  }
const userStyle = makeStyles((theme) => ({
    body: {
        //backgroundColor: "black",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#2d2d2d",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
        color: "#bebebe"
    },
    leftbar: {
        width: "25%",
        backgroundColor: "rgb(33, 33, 33)",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    detailsbar: {
        width: "20%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    centersection: {
        width: "75%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        position: "relative",
        height: "100%"
    }
}));
export default function Creator({ }) {
    const classes = userStyle();

    const location= window.location.hostname

    //console.log( _IndexDBCreate.createObjectURL("app.generate-nft.xyz") )

    const getImagesFData = () => {
        if (localStorage.getItem("imageFData")) {
            //console.log(JSON.parse(localStorage.getItem("imageFData")))
            return JSON.parse(localStorage.getItem("imageFData"))
        } else {
            return []
        }
        return []
    }

    const getLayersList = () => {
        if (localStorage.getItem("LayersList")) {
            //console.log(JSON.parse(localStorage.getItem("LayersList")))
            if (JSON.parse(localStorage.getItem("LayersList")).length >= 1) {
                return JSON.parse(localStorage.getItem("LayersList"))
            } else {
                return [
                    { layerposition: 1, layerid: 1, layername: "Backgrounds", imagescount: 0, layerrarity: 100, toselectNext: 0 },
                ]
            }

        } else {
            return [
                { layerposition: 1, layerid: 1, layername: "Backgrounds", imagescount: 0, layerrarity: 100, toselectNext: 0 },
            ]
        }
    }
    const getProjectData = () => {
        if (localStorage.getItem("projectdata")) {
            //console.log(JSON.parse(localStorage.getItem("projectdata")))
            return JSON.parse(localStorage.getItem("projectdata"))
        } else {
            return {
                projectName: "",
                projectwidth: 0,
                projectheight: 0,
                emailaddress: ""
            }

        }
    }
    //localStorage.removeItem("imageFData")
    const [images, setImages] = useState(getImagesFData);

    const [LayersList, setLayersList] = useState(getLayersList);

    const [selectedLayer, setSelectedLayer] = useState(1);

    //uses to select the available layer or new layer automatically
    const [layercount, setlayercount] = useState(LayersList.length);

    const [projectdata, setprojectdata] = useState(getProjectData());

    //console.log( projectdata)
    useEffect(() => {
        if (typeof images !== String) {
            localStorage.setItem("imageFData", JSON.stringify(images))
        }

        if (typeof LayersList !== String) {

            localStorage.setItem("LayersList", JSON.stringify(LayersList))
        }

        if (typeof projectdata !== String) {
            localStorage.setItem("projectdata", JSON.stringify(projectdata))
        }
    }, [images, LayersList, layercount, projectdata]);
    useEffect(() => {
        setSelectedLayer(LayersList[LayersList.length - 1].layerid)
    }, [layercount]);

    const [generatedPreview, setgeneratedPreview] = useState({});
    const [imageSettingsDialog, setimageSettingsDialog] = useState(false);
    const [layerSettingsDialog, setlayerSettingsDialog] = useState(false);
    const [generateorder, setgenerateorder] = useState(false);
    const [selectedPage, setSelectedPage] = useState("selectpackage");

    const [basicdetails, setbasicdetails] = useState({});

    const [_IndexDB, set_IndexDB] = useState( _IndexDBCreate.createObjectURL(location) );

    

    const [_IndexDBData, set_IndexDBData] = useState("dexa_images")

    useEffect(() => {
        getBasicDetails()
            .then(res => {
                setbasicdetails( res.data )
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    
    const getpaymentmodel = () => {
        if(( selectedPage === "selectpackage" ) || (selectedPage == "generate100")|| ( selectedPage === "projectmeta" ) ){
        return <OrderModelNew _IndexDBCreate={_IndexDBCreate} _IndexDB={_IndexDB} basicdetails={basicdetails} setprojectdata={setprojectdata} projectdata={projectdata} selectedPage={selectedPage} setSelectedPage={setSelectedPage} setgenerateorder={setgenerateorder} generateorder={generateorder} images={images} LayersList={LayersList} setLayersList={setLayersList} />
        }else if(selectedPage === "uladoigpaid" ){
            return <UploadPageNew  _IndexDBCreate={_IndexDBCreate} _IndexDB={_IndexDB}  basicdetails={basicdetails} setprojectdata={setprojectdata} projectdata={projectdata} selectedPage={selectedPage} setSelectedPage={setSelectedPage} setgenerateorder={setgenerateorder} generateorder={generateorder} images={images} LayersList={LayersList} setLayersList={setLayersList} />
        }else if( selectedPage == "doneupload" ){
            return <Completed setImages={setImages} setprojectdata={setprojectdata} selectedPage={selectedPage} setSelectedPage={setSelectedPage} setgenerateorder={setgenerateorder} generateorder={generateorder} images={images}  LayersList={LayersList}  setLayersList={setLayersList} />
        }else if( selectedPage === "payment" ){
            return <Payments setprojectdata={setprojectdata} projectdata={projectdata}  selectedPage={selectedPage} setSelectedPage={setSelectedPage} setgenerateorder={setgenerateorder} generateorder={generateorder} images={images}  LayersList={LayersList}  setLayersList={setLayersList} />
        }else{

        }
        
        //changed here for TESTINGGGGG
        /*}else if(( selectedPage == 3) ){
                return <Payments setprojectdata={setprojectdata} projectdata={projectdata}  selectedPage={selectedPage} setSelectedPage={setSelectedPage} setgenerateorder={setgenerateorder} generateorder={generateorder} images={images}  LayersList={LayersList}  setLayersList={setLayersList} />
           
            
        }else if( selectedPage == 5 ){
            return <UploadPage LayersList={LayersList} setSelectedPage={setSelectedPage} images={images} setgenerateorder={setgenerateorder} selectedPage={selectedPage} projectdata={projectdata} setprojectdata={setprojectdata} generateorder={generateorder} />
        */
        /*}else if( selectedPage == 3 ){
            return <UploadPage LayersList={LayersList} setSelectedPage={setSelectedPage} images={images} setgenerateorder={setgenerateorder} selectedPage={selectedPage} projectdata={projectdata} setprojectdata={setprojectdata} generateorder={generateorder} />
        
        }else if( selectedPage == 6){
            
            return <Completed  selectedPage={selectedPage} setSelectedPage={setSelectedPage} setgenerateorder={setgenerateorder} generateorder={generateorder} images={images}  LayersList={LayersList}  setLayersList={setLayersList} />
           
            }*/
    }
    return (
        <div>
            <div className={classes.body}>

                <div className={classes.leftbar}>
                    <LayerBar setSelectedPage={setSelectedPage} projectdata={projectdata} setprojectdata={setprojectdata} setlayerSettingsDialog={setlayerSettingsDialog} setimageSettingsDialog={setimageSettingsDialog} setgenerateorder={setgenerateorder} images={images} LayersList={LayersList} setLayersList={setLayersList} setSelectedLayer={setSelectedLayer} selectedLayer={selectedLayer} setgeneratedPreview={setgeneratedPreview} setImages={setImages} />
                </div>

                <div className={classes.centersection} >
                    <Previewer _IndexDBCreate={_IndexDBCreate} _IndexDBData={_IndexDBData} _IndexDB={_IndexDB} imagesList={images} generatedPreview={generatedPreview} setgeneratedPreview={setgeneratedPreview} />
                    <ImagesSection _IndexDBCreate={_IndexDBCreate} _IndexDBData={_IndexDBData} _IndexDB={_IndexDB} images={images} setImages={setImages} selectedLayer={selectedLayer} setimageSettingsDialog={setimageSettingsDialog} LayersList={LayersList} setLayersList={setLayersList} />
                </div>

                <ModalsImageSettings _IndexDBCreate={_IndexDBCreate} _IndexDBData={_IndexDBData} _IndexDB={_IndexDB} images={images} setImages={setImages} imageSettingsDialog={imageSettingsDialog} setimageSettingsDialog={setimageSettingsDialog} LayersList={LayersList} setLayersList={setLayersList} />
                <LayerSettingsModel setSelectedLayer={setSelectedLayer} layerSettingsDialog={layerSettingsDialog} setlayerSettingsDialog={setlayerSettingsDialog} LayersList={LayersList} setLayersList={setLayersList} images={images} setImages={setImages} />

                {getpaymentmodel()}


            </div>

        </div>

    )
}

/*
 <div className={classes.leftbar}>
                <LayerBar images={images} LayersList={LayersList} setLayersList={setLayersList}  setSelectedLayer={setSelectedLayer} selectedLayer={selectedLayer} />
            </div>

            <div  className={classes.centersection} >
                <ImagesSection images={images} setImages={setImages} selectedLayer={selectedLayer} />
            </div>

            <div  className={classes.detailsbar} >
                <DetailsBar/>
            </div>

            */



