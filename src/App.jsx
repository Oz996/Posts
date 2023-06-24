import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App