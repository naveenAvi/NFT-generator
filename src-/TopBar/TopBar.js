import {React, useState} from 'react'
import "./topbar.css";
import {  Badge, makeStyles, Input, alpha, Button, classNames, colors, Modal, SvgIcon } from "@material-ui/core"
import { Avatar,    Box, Typography } from "@material-ui/core"
import { Call} from "@material-ui/icons"
import { useHistory } from 'react-router-dom';

const userStyle = makeStyles((theme)=>({
    rightsection:{
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "white",
        padding:"0px",
        paddingRight:"5px",
        borderRadius:"100px",
        cursor:"pointer",
        ['@media (max-width:380px)']:{
            paddingRight:"0px",
        }
    },
    avatarttop:{
        marginRight:"10px",
        ['@media (max-width:380px)']:{
            marginRight:"0px",
        }
    },
    avatartext:{
        ['@media (max-width:380px)']:{
            display:"none",
        }
    },
    singlebadge:{
        marginRight: theme.spacing(2),
        color:"white",
        border:"none",
        cursor:"pointer"
    }, 
    menucollapes:{
        marginRight: theme.spacing(2),
    },
    postad:{
        marginRight: theme.spacing(2),
        width:"120px",
        height:"30px",
        cursor:"pointer",
        backgroundColor:"white"
    },
    logosection:{
        fontSize: "36px",
        fontStyle: "bold",
        [theme.breakpoints.down("sm")]: {
            fontSize: "26px",
        },
        color:"white",
        cursor:"pointer",
        height:"100%"
    },
    topbarwrapper:{
        display: "flex",
        height: "100%",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.up("sm")]: {
            width:"60%"
        },
        [theme.breakpoints.down("md")]: {
            width:"90%"
        },
        [theme.breakpoints.down("sm")]: {
            width:"100%"
        },
    },
    topbarsticky:{
        position:"sticky",
        top:"0px",
        zIndex:"99"
    },
    modelbox:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        
        width: 400,
        [theme.breakpoints.down("sm")]: {
            width:"80%",
        },
        backgroundColor: 'white',
        boxShadow: "24",
        padding: "20px",
        display:"flex",
        flexDirection:"column"
    },
    sendrequestbtn: {
        backgroundColor: "black",
        color: "white",
        marginLeft: "10px"
    },
    modalbtngroup: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
    },
    singlelanguageoption:{
        backgroundColor:"white",
        border:"none",
        marginLeft:"2px",
        cursor:"pointer"
    }
    
})); 
export default function  TopBar({setTogglesidebar, tooglesidebar, language, setLanguage}) {
    const classes = userStyle({});
    const [Showlogindialog,setShowlogindialog] = useState(false);
    const [logindetails, setLoginDetails ] = useState({
        token: localStorage.getItem('logindetais'),
        userid: localStorage.getItem('userid')
    })

    const history =  useHistory();
    const registerLogin = (isregister) => {
        setShowlogindialog(false)
        if (isregister) {
            history.push("/register");
        } else {
            history.push("/login");
        }
    }
    const gotocontactus = () => {
        setShowlogindialog(false)
        history.push("/contact-us");
    }
    const gotomainpage = () =>{
        history.push("/");
    }

    function postanadvertisement() {
        const logindetais = localStorage.getItem('logindetais');
        const username = localStorage.getItem('username');
        const userid = localStorage.getItem('userid');
        if(( logindetais) && (userid)){
            if( logindetais.length > 16 ){
                history.push("/posts/recievedrequests")
                //history.push("/posts");
            }else{
               // history.push("/login");
               setShowlogindialog(true);
            }
        }else{
            setShowlogindialog(true)
        }
        
    }
    function menusidebar() {
        if( tooglesidebar ){
            setTogglesidebar(false);
        }else{
            setTogglesidebar(true);
        }
    }

    function getLan(name) {
        //console.log(selectedLang + " trans")
        
    }
    return (
        <div className={classes.topbarsticky}>
            <div className="maintopbar">
                <div className={classes.topbarwrapper}>
                    

                    <div className={classes.rightsection} onClick={()=>postanadvertisement()}>
                        <Avatar  className={classes.avatarttop}  /> 
                        <div className={classes.avatartext}  >
                            Account
                        </div>
                        
                    </div>
                    
                    <div className={classes.logosection} onClick={()=>gotomainpage()}>
                        <div style={{height:"100%"}}>
                            <img style={{height:"100%"}} src="\logo_white.svg" />
                        </div>
                    </div>
                    
                    <Badge  color="primary" className={classes.singlebadge}>
                        
                        <button className={classes.singlelanguageoption} onClick={()=>setLanguage("si")} style={{ backgroundColor: (language=="si" ? "black" : 'white'), color: (language=="si" ? "white" : 'black')}}>
                            සිං 
                        </button>
                        <button className={classes.singlelanguageoption} onClick={()=>setLanguage("en")}  style={{ backgroundColor: (language=="en" ? "black" : 'white'), color: (language=="en" ? "white" : 'black')}}>
                            en
                        </button>
                    </Badge>

                </div>
            </div>

            <Modal
                open={Showlogindialog}
                onClose={() => setShowlogindialog(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modelbox}>
                    
                    <img src="\logo_black.svg" style={{ width:"200px", marginLeft:"auto", marginRight:"auto", marginBottom:"10px"}}/>
                        {getLan("accountneed")}
                    
                    <div className={classes.modalbtngroup}>
                        <Button className={classes.sendrequestbtn} onClick={() => registerLogin(true)}>

                            {getLan("register")}
                        </Button>
                        <Button className={classes.sendrequestbtn} onClick={() => registerLogin(false)}>
                            {getLan("login")}
                        </Button>
                        <Button className={classes.sendrequestbtn} onClick={() =>gotocontactus()}>
                            <Call />
                            {getLan("contact")}
                        </Button>
                    </div>

                </Box>
            </Modal>
        </div>
    )
}

/*

removed
<Menu fontSize="large"  onClick={()=>menusidebar()}/>


login button
<button  className={classes.postad} onClick={()=>postanadvertisement()}>
    {( (logindetails.token == null) ? "Post ad" : "Dashboard" )}
    </button>

*/