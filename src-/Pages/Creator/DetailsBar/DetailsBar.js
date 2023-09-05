import { Button, Input, makeStyles,  } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const userStyle = makeStyles((theme) => ({
    classestitle:{
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
    },
    rightsection:{
        right:"0px",
        //width:theme.spacing(30),
        marginRight:"10px",
        backgroundColor:"rgb(33, 33, 33)"
    },
    projectinputbox:{
        padding: '8px 8px',
        margin:' 5px 0',
        boxSizing: 'border-box',
        width:"100%",
        backgroundColor:"transparent",
        border:"1px solid #5791f0",
        borderRadius:"5px"
    },
    rowedinputs:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        justifyContent:'space-between'
    },
    rowedinputssingle:{
        width:"45%",

    },
    singleinputholder:{
        width:"100%"
    },
    singleinputsectionholder:{
        width:"100%"
    },
    singlesection:{
        padding:"5px",
        border: "1px solid black",
        marginBottom:"5px"
    }
  }));
export default function DetailsBar({}){
    const classes = userStyle();
    return (
        <div className={classes.rightsection}>
            <div  className={classes.singlesection}>
                <div className={classes.classestitle}>
                    <h3>
                    Project Settings
                    </h3>

                    <div onClick={()=> localStorage.removeItem("imageFData") }>
                        Clear Project
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Project Name </label>
                    <div>
                        <input  className={classes.projectinputbox} type='text' />
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Project Description</label>
                    <div>
                        <input className={classes.projectinputbox}  type='text' />
                    </div>
                </div>


                <div  className={classes.singleinputsectionholder}>
                    <label className={classes.projectlabelName}>Collection Size</label>
                    <div className={classes.singleinputholder}>
                        <input className={classes.projectinputbox}  type='text' />
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Image Size</label>
                    <div className={classes.rowedinputs} >
                        <div className={classes.rowedinputssingle} >
                            <input style={{width:"100%"}} className={classes.projectinputbox}  type='text' />
                        </div>
                        <div className={classes.rowedinputssingle} >
                            <input style={{width:"100%"}}  className={classes.projectinputbox}  type='text' />
                        </div>
                    </div>
                </div>
            </div>


            <div className={classes.singlesection}>
                <div className={classes.classestitle}>
                    <h3>
                    Layer Settings
                    </h3>

                    <div>
                        Remove
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Layer Name </label>
                    <div>
                        <input  className={classes.projectinputbox} type='text' />
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Layer Placement</label>
                    <div>
                        <Button>
                            <ArrowUpward /> Move Upward
                        </Button>
                    </div>
                    <div>
                        <Button>
                            <ArrowDownward /> Move Downward
                        </Button>
                    </div>
                </div>

            </div>


            <div className={classes.singlesection}>
                <div className={classes.classestitle}>
                    <h3>
                    Image Settings
                    </h3>

                    <div>
                        Remove
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Image Name </label>
                    <div>
                        <input  className={classes.projectinputbox} type='text' />
                    </div>
                </div>

                <div>
                    <label className={classes.projectlabelName}>Rare settings</label>
                    <div>
                        <input  className={classes.projectinputbox} type='text' />
                    </div>
                </div>

            </div>
        </div>
    )
}