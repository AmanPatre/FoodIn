import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { Routes , Route } from "react-router-dom";
import Add from "./screens/Add";
import Orders from "./screens/Orders";
import List from "./screens/List";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    
   
      <Navbar />
      <hr />
      <div className="app-cont flex w-[100vw]">
        <Sidebar />
        <Routes>
          <Route path = '/' element={<Orders/>}></Route>
           <Route path = '/add' element={<Add/>}></Route>
            <Route path = '/orders' element={<Orders/>}></Route>
             <Route path = '/list' element={<List/>}></Route>
       
        </Routes>
      </div>
     <ToastContainer/>
    </>
  );
}

export default App;
