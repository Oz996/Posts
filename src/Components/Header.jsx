import logo from "/logo.png"

const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-700 h-20 w-screen">
        <div className="flex items-center text-white ml-7">
            <img src={logo} className="w-16" alt="" />
            <span className="uppercase font-semibold text-2xl ml-3">Posts</span>
        </div>
        <div className="text-white text-lg uppercase flex gap-5 mr-7">
            <a href="">Create</a> <a href="">Login</a>
        </div>
    </nav>
  )
}

export default Header