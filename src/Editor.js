import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";
const useStyles = makeStyles({
  editor: {
    padding: "20px",
    border: "1px solid #ddd",
    minHeight: "150px",
    overflow: "auto",
    fontFamily: "Courier New, monospace",
  },
});

const Editor = () => {
  const classes = useStyles();
  const fields = useSelector((state) => state.fields);

  return (
    <Paper className={classes.editor} elevation={3}>
      <Typography variant="h6">Editor</Typography>
      <Typography variant="body1">{JSON.stringify(fields, null, 2)}</Typography>
    </Paper>
  );
};

export default Editor;
