import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "./redux/postsSlice";

const App = () => {
  const { posts } = useSelector((state) => state.posts);

  console.log(posts);

  return <div>Hello World!</div>;
};

export default App;
