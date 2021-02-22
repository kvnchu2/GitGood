import React from "react";
import OppositeTimeline from './OppositeTimeline.js'
import { classnames } from "@material-ui/data-grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "50px",
  },
}));


export default function Show(props){
  const classes = useStyles();
    return (<div id="show">
              <img src={ props.avatar } alt="nothing"></img>
              <a target="_blank" href={`https://github.com/${props.loginUser}`} className={classes.root}>
                <h4><GitHubIcon />@{props.loginUser}</h4>

              </a>
              {props.name && <h4>{props.name}'s Timeline</h4>}
              <div id="opposite-timeline">
                <OppositeTimeline filterParam={props.filterParam} repositories={props.repositories} avatar={props.avatar}/>
              </div> 
            </div>
    )
  }