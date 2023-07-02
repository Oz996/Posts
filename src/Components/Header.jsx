import logo from "/logo.png";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectIsLoggedIn } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import FormModal from "./FormModal";

const Header = () => {
  const [authModal, setAuthModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  const logoutUser = () => {
    dispatch(logout());
    auth.signOut();
    toast.info("You have been signed out");
  };

  const handleFormModalClick = () => {
    if (!loggedIn) {
      toast.info("Login to create a post");
      return
    }
    setFormModal(prev => !prev)
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-700 h-20 w-screen">
      <div className="flex items-center text-white ml-7">
        <img src={logo} className="w-16" alt="" />
        <span className="uppercase font-semibold text-2xl ml-3">Posts</span>
      </div>
      <div className="text-white text-lg uppercase flex gap-5 mr-7">
        <span className="cursor-pointer" onClick={handleFormModalClick}>
          Create
        </span>
        {loggedIn ? (
          <span className="cursor-pointer" onClick={logoutUser}>
            Logout
          </span>
        ) : (
          <span
            className="cursor-pointer"
            onClick={() => setAuthModal((prev) => !prev)}
            to="#"
          >
            Login
          </span>
        )}
      </div>
      {authModal && <AuthModal setAuthModal={setAuthModal} />}
      {formModal && <FormModal setFormModal={setFormModal}/>}
    </nav>
  );
};

export default Header;
