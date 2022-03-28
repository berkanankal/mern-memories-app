import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { addPost } from "../../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId, updatePost } from "../../redux/postsSlice";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    title: "",
    message: "",
    creator: "",
    photo: "default.png",
    tags: [],
  });

  const currentId = useSelector((state) => state.posts.currentId);
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.data.find((post) => post._id === currentId)
      : null
  );

  useEffect(() => {
    if (post) setNewPost(post);
  }, [post]);

  const onInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewPost({ ...newPost, photo: e.target.files[0] });
  };

  const clearInputs = () => {
    setNewPost({
      title: "",
      message: "",
      creator: "",
      photo: "",
      tags: [],
    });
    dispatch(setCurrentId(null));
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

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("message", newPost.message);
    formData.append("creator", newPost.creator);
    var array = newPost.tags;
    for (var i = 0; i < array.length; i++) {
      formData.append("tags[]",array[i]);
    }
    formData.append("photo", newPost.photo);

    if (currentId) {
      dispatch(updatePost({ currentId, formData }));
    } else {
      dispatch(addPost(formData));
    }

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
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
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
            setNewPost({ ...newPost, tags: e.target.value.trim().split(",") })
          }
        />
        <div className={classes.fileInput}>
          <input type="file" onChange={handlePhoto} />
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
        <Button
          style={{ marginTop: "10px" }}
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
