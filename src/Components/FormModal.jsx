import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/slice/postsSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectIsLoggedIn, selectEmail } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import logo from "/logo.png";

const FormModal = ({ setFormModal }) => {
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
      setFormModal(false);
      setFormData(initialState);
    }
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70">
      <div className="w-3/12 mx-auto mt-5 fixed top-52 right-0 left-0 bg-white h-3/5 border rounded border-black ">
      <div className="flex justify-end">
          <MdClose
            onClick={() => setFormModal(false)}
            size={26}
            className="cursor-pointer"
          />
        </div>
        <div className="w-11/12 mx-auto mt-5">
          <h2 className="text-2xl text-center mb-2">Create a Post</h2>
          <div className="flex flex-col">
            <img className="w-32 self-center mt-3" src={logo} alt="logo" />
          </div>
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
              rows="9"
              placeholder="Content..."
              onChange={handleChange}
              value={formData.body}
            ></textarea>
            <button className="bg-slate-700 text-white rounded py-1">
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormModal;
