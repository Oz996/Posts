import { NavLink } from "react-router-dom";
import logo from "/logo.png";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectIsLoggedIn } from "../redux/slice/userSlice";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

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
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-700 h-20 w-screen">
      <div className="flex items-center text-white ml-7">
        <img src={logo} className="w-16" alt="" />
        <span className="uppercase font-semibold text-2xl ml-3">Posts</span>
      </div>
      <div className="text-white text-lg uppercase flex gap-5 mr-7">
        <NavLink to="/">Create</NavLink>
        {loggedIn ? (
          <span className="cursor-pointer" onClick={logoutUser}>
            Logout
          </span>
        ) : (
          <NavLink onClick={() => setShowModal((prev) => !prev)} to="#">
            Login
          </NavLink>
        )}
      </div>
      {showModal && <AuthModal setShowModal={setShowModal} />}
    </nav>
  );
};

export default Header;
