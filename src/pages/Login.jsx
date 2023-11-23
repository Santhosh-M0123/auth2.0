import React from "react";
import "../components/Authenticate.css";
import { useState,useEffect } from "react";
import {useNavigate , Link} from "react-router-dom";
import axios from "axios";
import {ToastContainer , toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

    let [userName , setUser] = useState("");
    let [pass,setPass] = useState("");

    //url

    let Url = "http://localhost:8000/auth"

    //navigate

    let navigate = useNavigate();

    //login function

    let Login = async () => {
        let res = await axios.post(Url + "/login" , {
            user : userName,
            pass : pass
        }).catch(err => {
            console.log(err.response)
            if(err.response.status === 400){
                toast.warn(err.response.data);
            }
        })
        // console.log(res)
        if(res.status === 200){
            localStorage.setItem("token" , res.data);
            navigate("/home");
        }else{
            console.log("error occurs")
        }
    }

    let Help = () => {
      navigate("/client");
    }
  return (
    <div className="login-body">
        <ToastContainer/>
      <div className="login-form">
        <div className="form-ins">
            <h2>Auth <span style={{color : "#F50057"}}>2.O</span></h2>
            <p>Powered by <span style={{color : "#F50057"}}>JWT</span></p>
            <div className="login-noti">
                <h5>Login</h5>
            </div>
        </div>
        <div className="form">
        <form onSubmit={e=> e.preventDefault()}>
          <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={userName}
              onChange = {e => setUser(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your username with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="login-btn">
          <button type="submit" className="btn login-btn-button" onClick={Login}>
            Login
          </button>
          </div>
          <div className="footer">
            <p>Doesn't have an account?</p>
            <Link to = "/register">
                Register
            </Link>
          </div>
          <div className="below-footer">
            <span onClick={Help}>Need Help?</span>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
