import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Application from '../components/Application';

const Home = () => {


  let navigate = useNavigate();

  // useEffect(()=>{
  //   // let data = localStorage.getItem("token");
  //   if(data === null){
  //     navigate('/');
  //   }
  // },[]);
  return (
    <div>
      <Navbar/>
      <Application/>
    </div>
  )
}

export default Home;