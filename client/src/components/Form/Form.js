import React, { useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { addPost } from "../../redux/postsSlice";
import { useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    title: "",
    message: "",
    creator: "",
    tags: [],
  });
  const classes = useStyles();

  const onInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const clearInputs = () => {
    setNewPost({
      title: "",
      message: "",
      creator: "",
      tags: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newPost.title.trim() === "" ||
      newPost.message.trim() === "" ||
      newPost.creator.trim() === ""
    ) {
      return;
    }

    console.log(newPost);

    dispatch(addPost(newPost));

    clearInputs();
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">`Editing ""` "Creating a Memory"</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={newPost.creator}
          onChange={onInputChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={newPost.title}
          onChange={onInputChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={newPost.message}
          onChange={onInputChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={newPost.tags}
          onChange={(e) =>
            setNewPost({
              ...newPost,
              tags: [...e.target.value.split(",")],
            })
          }
        />
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
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clearInputs}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
