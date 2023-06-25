import { useSelector, useDispatch } from "react-redux";
import {
  createPost,
  selectAllPosts,
  showPosts,
} from "../redux/slice/postsSlice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectIsLoggedIn, selectEmail } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import Reactions from "./Reactions";

const Create = () => {
  const initialState = {
    title: "",
    body: "",
    reactions: {
      thumbsUp: 0,
      cool: 0,
      wow: 0,
      funny: 0,
      love: 0,
    },
  };
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const posts = useSelector(selectAllPosts);
  const email = useSelector(selectEmail);

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addNewPost = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.info("You need to login to create a post");
      return;
    }
    const { title, body } = formData;
    if (!title || !body) {
      toast.error("Please fill out both fields");
      return;
    }
    if (title.length > 40) {
      toast.error("Title cannot exceed 40 characters");
      return;
    }
    if (body.length > 600) {
      toast.error("Post content cannot exceed 600 characters");
      return;
    }
    if (formData) {
      dispatch(
        createPost({
          id: nanoid(),
          title,
          body,
          email,
          reactions: {
            thumbsUp: 0,
            cool: 0,
            wow: 0,
            funny: 0,
            love: 0,
          },
        })
      );
      setFormData(initialState);
    }
  };
  useEffect(() => {
    dispatch(showPosts()).catch((error) => {
      console.error(error);
    });
  }, [dispatch]);

  return (
    <>
      <section className="w-2/5 mx-auto mt-5">
        <h2 className="text-2xl text-center mb-2">Create a Post</h2>
        <form className="flex flex-col" onSubmit={addNewPost}>
          <input
            className="my-2 p-1 border rounded"
            type="text"
            name="title"
            placeholder="Title..."
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            className="my-2 p-1 resize-none border rounded"
            name="body"
            rows="8"
            placeholder="Content..."
            onChange={handleChange}
            value={formData.body}
          ></textarea>
          <button className="bg-slate-700 text-white rounded py-1">
            Submit Post
          </button>
        </form>
      </section>

      <article className="w-3/5 mx-auto">
        {posts.map((post) => (
          <div
            className="my-5 bg-slate-700 text-white rounded p-3 text-center"
            key={post.id}
          >
            <h2 className="font-semibold text-2xl mb-3">{post.title}</h2>
            <p>{post.body}</p>
            <p className="font-semibold mt-3">{post.email}</p>
            <Reactions post={post}/>
          </div>
        ))}
      </article>
    </>
  );
};

export default Create;
