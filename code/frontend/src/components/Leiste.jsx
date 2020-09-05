import React from 'react'
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles(theme => ({
    root: {
        background_color: '#282c34',
        min_height: '100vh',
        display: 'flex',
        flex_direction: 'column',
        align_items: 'center',
        justify_content: 'center',
        font_size: 'calc(10px + 2vmin)',
        color: 'defau',
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: 135,
        height: 50
    }
}));

export default function Leiste() {
    const classes = useStyles();
    return (
        <AppBar position="static" style={{background: '#ffffff'}} className={classes.root}>
            <Toolbar style={{alignItems: "center", justifyContent: "left"}}>
                {<img src='./logo.jpg' alt="Logo" className={classes.logo}/>}
            </Toolbar>
        </AppBar>
    );
}
