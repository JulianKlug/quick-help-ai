import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    background_color: "#282c34",
    min_height: "100vh",
    display: "flex",
    flex_direction: "column",
    align_items: "center",
    justify_content: "center",
    font_size: "calc(10px + 2vmin)",
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div
      style={{
        fontWeight: "200",
        background: "#d40037",
        height: "500px",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        padding: "0 1em",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{ marginTop: "5em", fontWeight: "lighter", fontSize: "3rem" }}
        >
          Wie kann ich dir helfen?
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <label>Du kannst mich alles fragen</label>
          <input placeholder="Du kannst mich alles fragen" />
        </div>

        <span>Nicht gefunden was du suchts? Frag mal nach Reto.</span>
      </div>
    </div>
    // <AppBar position="static" className={classes.root}>
    //     <Typography variant="h6" className={classes.title}>
    //       QAI
    //     </Typography>
    // </AppBar>
  );
}
