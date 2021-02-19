import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import GitGoodLogo from './GitGoodLogo.png'
import { LeftEmptyCell } from '@material-ui/data-grid';



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: 160,
      float: 'left', 
    }
  }),
);

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#000020' }}>
      <Toolbar>
          <Typography edge="start" className={classes.title}>
            <img src={GitGoodLogo} alt="GitGood logo" className={classes.logo}></img>
          </Typography>
          <IconButton color="inherit" onClick={()=>props.toMain()}>
                <HomeIcon />
            </IconButton>
          <IconButton aria-label="show 4 new favorites" color="inherit" onClick={()=>props.toLiked()}>
              {/* <Badge badgeContent={4} color="secondary"> */}
                <FavoriteBorderIcon />
              {/* </Badge> */}
            </IconButton>
          <Button color="inherit" onClick={ props.setStorage }>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}