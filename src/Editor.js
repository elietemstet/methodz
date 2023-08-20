import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";
const useStyles = makeStyles({
  editor: {
    padding: "100px",
    marginTop: "1%",
    marginLeft: "35%",
    border: "5px solid orange",
    width: "30%",
    backgroundColor: "white",
    height: "300px",
  },
});

const Editor = () => {
  const classes = useStyles();
  const fields = useSelector((state) => state.fields);

  return (
    <Paper className={classes.editor} elevation={3}>
      <h2>Editor</h2>
      <Typography variant="body1">{JSON.stringify(fields, null, 2)}</Typography>
    </Paper>
  );
};

export default Editor;
