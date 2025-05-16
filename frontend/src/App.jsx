import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Screens/Home';
import Cart from "./Screens/Cart";
import Order from "./Screens/Order";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import { useState } from "react";
import LoginPopUp from "./Components/LoginPopUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./Screens/verify";
import Myorders from "./Screens/Myorders";
import Menu from "./Components/Menu";

function App() {

  const [showLogin , setshowLogin] = useState(false)

  return (
    <>
    {showLogin? < LoginPopUp setshowLogin={setshowLogin} /> : <></>}
     <div>
      <Navbar setshowLogin={setshowLogin}/>
      <Routes>
        <Route exact path = "/" element = {<Home/>}></Route>
        <Route exact path = "/cart" element = {<Cart/>}></Route>
      
        <Route exact path = "/order" element = {<Order/>}></Route>
        <Route exact path = '/verify' element={<Verify/>}></Route>
        <Route exact path = '/myorders' element ={<Myorders/>}></Route>
      </Routes> 
      <Footer/>
      
       </div>
  
  <ToastContainer/>

  
    </>
  )
}

export default App
