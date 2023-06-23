import logo from "/logo.png";
import { BiLogoGoogle } from "react-icons/bi";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";

const AuthModal = ({ setShowModal }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const loginWithGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setShowModal(false);
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
            setShowModal(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-70">
      <div className="w-4/12 mx-auto mt-5 absolute top-60 right-0 left-0 bg-white h-3/5 border rounded border-black shadow-lg">
        <MdClose
          onClick={() => setShowModal(false)}
          size={26}
          className="cursor-pointer"
        />
        {login ? (
          <form className="flex flex-col w-3/5 mx-auto">
            <img className="w-32 self-center mt-3" src={logo} alt="logo" />
            <h2 className="text-2xl font-semibold my-3 self-center">
              Welcome Back
            </h2>
            <input
              onChange={handleChange}
              className="my-2 p-1 border"
              type="email"
              name="email"
              placeholder="Email..."
            />
            <input
              onChange={handleChange}
              className="my-2 p-1 border"
              type="password"
              name="password"
              placeholder="Password..."
            />
            <button
              onClick={loginUser}
              className="bg-slate-700 text-white rounded py-1"
            >
              Login
            </button>
            <button
              onClick={loginWithGoogle}
              className="bg-slate-300 mt-2 rounded py-1 flex justify-center place-items-center"
            >
              <BiLogoGoogle size={17} /> Login with Google
            </button>
            <h2
              onClick={() => setLogin(false)}
              className="mt-20 flex gap-2 items-center underline cursor-pointer"
            >
              <FaRegArrowAltCircleRight size={19} /> Register
            </h2>
          </form>
        ) : (
          <form className="flex flex-col w-3/5 mx-auto">
            <img className="w-32 self-center mt-3" src={logo} alt="logo" />
            <h2 className="text-2xl font-semibold my-3 self-center">
              Register
            </h2>
            <input
              onChange={handleChange}
              className="my-2 p-1 border"
              type="email"
              name="email"
              placeholder="Email..."
            />
            <input
              onChange={handleChange}
              className="my-2 p-1 border"
              type="password"
              name="password"
              placeholder="Password..."
            />
            <input
              className="my-2 p-1 border"
              type="password"
              name="cPassword"
              placeholder="Confirm Password..."
            />
            <button
              onClick={registerUser}
              className="bg-slate-700 text-white rounded py-1"
            >
              Register
            </button>
            <h2
              onClick={() => setLogin(true)}
              className="mt-20 flex gap-2 items-center underline cursor-pointer"
            >
              <FaRegArrowAltCircleLeft size={19} /> Back
            </h2>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
