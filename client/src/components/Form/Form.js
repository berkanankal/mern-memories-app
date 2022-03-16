import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";

const Form = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">`Editing " : "Creating a Memory"</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
        />
        <TextField name="title" variant="outlined" label="Title" fullWidth />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
