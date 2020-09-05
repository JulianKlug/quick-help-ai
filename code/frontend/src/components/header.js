import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

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
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            QAI
          </Typography>
      </AppBar>
  );
}