import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, fetchUsers } from "./redux/postsSlice";

const App = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  console.log(posts.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      Hello World!
      <button
        onClick={() =>
          dispatch(addPost({ title: "deneme", message: "deneme" }))
        }
      >
        Ekle
      </button>
    </div>
  );
};

export default App;
