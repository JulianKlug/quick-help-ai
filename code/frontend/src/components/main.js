import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import respond from "../apiCalls";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    background_color: "#282c34",
    min_height: "100vh",
    display: "flex",
    flex_direction: "column",
    align_items: "center",
    justify_content: "center",
    font_size: "calc(10px + 2vmin)",
    color: "black",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
}));

const USER = "USER";
const AI = "AI";

function buildQuestionHistory(feed) {
  let questionHistory = [];
  for (let i = 0; i < feed.length; i += 2) {
    questionHistory.push({
      q: feed[i].text,
      a: feed[i + 1].text,
    });
  }
  return questionHistory;
}

function buildMessage({ text, owner }) {
  if (!text || !owner) throw new Error("Text nad owner required!");
  return {
    id: uuidv4(),
    text,
    owner,
  };
}

export default function Main() {
  const [feed, setFeed] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userMessage = buildMessage({ text: questionInput, owner: USER });
    console.log(userMessage);
    setFeed((feed) => [...feed, userMessage]);
    setQuestionInput("");
    setIsTyping(true);

    const questionHistory = buildQuestionHistory(feed);
    await respond(userMessage.text, questionHistory).then((res) => {
      const aiMessage = buildMessage({ text: res, owner: AI });
      setFeed((feed) => [...feed, aiMessage]);
      setIsTyping(false);
    });
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
            onChange={(data) => setQuestionInput(data.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={isTyping}
          />
          <Button type="submit" variant="contained" disabled={isTyping}>
            Send Icon.
          </Button>
        </form>
      </div>
      <div>
        {feed.map((item) => {
          return <div key={item.id}>{item.text}</div>;
        })}
      </div>
      {/* <pre>{JSON.stringify({ isTyping, questionInput, feed }, null, 2)}</pre> */}
    </Fragment>
  );
}
