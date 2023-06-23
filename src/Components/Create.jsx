import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../redux/slice/postsSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { addPost } from "../redux/slice/postsSlice";

const Create = () => {
  const initialState = {
    title: "",
    body: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [userId, setUserId] = useState("");
  const posts = useSelector(selectAllPosts);

  const dispatch = useDispatch();

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
    if (formData) {
      dispatch(
        addPost({
          id: nanoid(),
          title: formData.title,
          body: formData.body,
          userId,
        })
      );
      setFormData("");
    }
  };

  return (
    <>
      <section className="w-2/5 mx-auto mt-5">
        <h2 className="text-2xl text-center mb-2">Create a Post</h2>
        <form className="flex flex-col" onSubmit={addNewPost}>
          <input
            className="my-2 p-1 border"
            type="text"
            name="title"
            placeholder="Title..."
            onChange={handleChange}
          />
          <textarea
            className="my-2 p-1 resize-none border"
            name="body"
            rows="8"
            placeholder="Content..."
            onChange={handleChange}
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
          </div>
        ))}
      </article>
    </>
  );
};

export default Create;
