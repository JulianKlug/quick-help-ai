import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    background_color: '#282c34',
    min_height: '100vh',
    display: 'flex',
    flex_direction: 'column',
    align_items: 'center',
    justify_content: 'center',
    font_size: 'calc(10px + 2vmin)',
    color: 'white',
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
  menuBar: {
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menuBar}>
          <Typography variant="h6" className={classes.title}>
            QAI
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}