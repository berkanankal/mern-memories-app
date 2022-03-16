import { useEffect } from "react";
import { fetchPosts } from "../../redux/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const { status } = useSelector((state) => state.posts.fetchPosts);
  const classes = useStyles();

  const dispatch = useDispatch();

  console.log(posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  console.log(posts);
  console.log(status);

  return (
    <div>
      {status === "loading" && <CircularProgress />}
      {status === "succeeded" && (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.data.map((post) => (
            <Grid item xs={12} sm={6} md={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
