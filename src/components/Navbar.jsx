import React from "react";
import "./nav.css";
import {Outlet , useNavigate} from "react-router-dom";
import axios from "axios";

const Navbar = () => {

  let token = localStorage.getItem("token");

  let navigate = useNavigate();
  let Logout = async () => {
    let res = await axios.post("http://localhost:8000/user/logout" , {
      token : token
    }).catch(err => {
      if(err.response.status === 404){
        console.log("unauthorised")
      }
    })

    if(res.status === 200){
      localStorage.removeItem("token");
      navigate("/");
    }
  }
  return (
    <div className="nav-bar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{color : "#F50057"}}>
            Auth2.0
          </a>
          {/* <h4 className="navbar-brand">Uxon</h4> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/account">
                  Accounts
                </a>
              </li>
            </ul>
            <span className="navbar-text logout" onClick={Logout}>Logout</span>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
