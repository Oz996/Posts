import { NavLink } from "react-router-dom";
import logo from "/logo.png";
import { useState } from "react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-700 h-20 w-screen">
      <div className="flex items-center text-white ml-7">
        <img src={logo} className="w-16" alt="" />
        <span className="uppercase font-semibold text-2xl ml-3">Posts</span>
      </div>
      <div className="text-white text-lg uppercase flex gap-5 mr-7">
        <NavLink to="/">Create</NavLink> <NavLink onClick={() => setShowModal(prev => !prev)} to="#">Login</NavLink>
      </div>
      {showModal && <AuthModal setShowModal={setShowModal} />}
    </nav>
  );
};

export default Header;
