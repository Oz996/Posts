import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, showPosts } from "../redux/slice/postsSlice";
import Reactions from "./Reactions";
import { useEffect } from "react";

const Create = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts)

  useEffect(() => {
    dispatch(showPosts()).catch((error) => {
      console.error(error);
    });
  }, [dispatch]);

  return (
    <>
      <article className="w-3/5 mx-auto mt-20">
        {posts.map((post) => (
          <div
            className="my-5 bg-slate-700 text-white rounded p-3 text-center"
            key={post.id}
          >
            <h2 className="font-semibold text-2xl mb-3">{post.title}</h2>
            <p>{post.body}</p>
            <p className="font-semibold mt-3">{post.email}</p>
            <Reactions post={post} />
          </div>
        ))}
      </article>
    </>
  );
};

export default Create;
