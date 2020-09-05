import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import respond from "../apiCalls";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    background_color: '#282c34',
    min_height: '100vh',
    display: 'flex',
    flex_direction: 'column',
    align_items: 'center',
    justify_content: 'center',
    font_size: 'calc(10px + 2vmin)',
    color: 'black',
  },
 container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
}));


export default function Main() {
  const [feed, setFeed] = useState([]);
  const [questionInput, setQuestionInput] = useState('');

  const classes = useStyles();

  const handleSubmit = (event) => {
      event.preventDefault()
      setFeed(feed => [...feed, questionInput])
      setQuestionInput('')
  }

  console.log(feed)

  return (
    <div className={classes.root}>
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-full-width"
        label="QAI"
        style={{ margin: 8 }}
        placeholder="Fragen Sie mich einfach!"
        helperText="Ihr persönlicher QAI-bot steht Ihnen zur Verfügung."
        fullWidth
        margin="normal"
        variant="outlined"
        value={questionInput}
        onChange={(data) => setQuestionInput(data.target.value) }
        InputLabelProps={{
          shrink: true,
        }}
      />
    <Button type="submit" variant="contained">Send Icon.</Button>
    </form>
        {feed.map(item => {
            return (
                <div>{item}</div>
            )
        })}
    </div>
  );
}