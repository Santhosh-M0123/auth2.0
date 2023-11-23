import React from "react";
import "../components/Authenticate.css";
import { useState,useEffect } from "react";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {

    let [userName , setUser] = useState("");
    let [pass,setPass] = useState("");
    let [email,setEmail ]  = useState("");
    let [backupEmail,setbackUp] = useState("");

    let navigate = useNavigate();

    //uRL 

    let Url = "http://localhost:8000/auth"

    //login function

    let Login = async () => {
      let res = await axios.post(Url + "/register",{
        user : userName,
        pass : pass,
        email : email,
        backup : backupEmail
      }).catch(err => {
        if(err.response.status == 400){
          toast.warn(err.response.data);
        }
      })
      if(res.status == 200){
        navigate("/");
      }
    }
  return (
    <div className="login-body">
      <ToastContainer/>
      <div className="login-form">
        <div className="form-ins">
            <h2>Hacktrix <span style={{color : "#F50057"}}>1.O</span></h2>
            <p>Powered by <span style={{color : "#F50057"}}>UXON</span></p>
            <div className="login-noti">
                <h5>Register</h5>
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
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              User Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange = {e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Backup email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={backupEmail}
              onChange = {e => setbackUp(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
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
            Register
          </button>
          </div>
          <div className="footer">
            <p>Already have an account?</p>
            <Link to = "/">
                Login
            </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
