import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Menu from '../Components/Menu'


const Home = () => {

  const [category , setCategory] = useState("All")
  return (
    <div>
   
    <Header/>
    <Menu category={category} setCategory = { setCategory}/>
    </div>
  )
}

export default Home
