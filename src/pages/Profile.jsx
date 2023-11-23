import React from "react";
import { useState,useEffect } from "react";
import "../components/Profile.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {


  const [userName , setUserName] = useState(""); 
  const [email , setemail] = useState(""); 
  const [profileCard, setProfileCard] = useState(true);
  const [allDetails, setAllDetails] = useState(true);
  const [user, setUser] = useState(false);
  const [Email, setEmail] = useState(false);
  const [pass, setPass] = useState(false);
  const [userReset, setUserReset] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  let [err,setErr] = useState("err-none");
  let [profile,setProfile] = useState("profile");

  let token = localStorage.getItem("token");

  let Update = async () => {
    let res = await axios.post("http://localhost:8000/user/update" , {
        token : token
    }).catch(err => {
        if(err.response.status === 400){
            setErr("err");
            setProfile("pro-none")
        }else{
            setProfile("profile")
        }
    })
    // console.log(res.data)
    if(res.status === 200){
        setUserName(res.data[0].username);
    setemail(res.data[0].account_email);
    }
  }
  useEffect(() => {
    Update()
  },[])

  const btnProfile = async () => {
    setUserReset(true);
    setProfileCard(false);
  };
  const btnUsername = async () => {
    setAllDetails(false);
    setUser(true);
  };
  const btnEmail = async () => {
    setAllDetails(false);
    setEmail(true);
  };
  const btnPassword = async () => {
    setAllDetails(false);
    setPass(true);
  };

  let ResetAll = async () => {
    let res = await axios
    .post(
      "http://localhost:8000/user/updateall",
      {
        user : newUser,
        pass: newPass,
        token: token,
        email : newEmail
      }
    )
    .catch((err) => {
      if (err.response.status === 404) {
        toast.warn(err.response.data);
      }
    });

  if (res.status === 200) {
    toast("updated Successfully");
    setProfileCard(true);
    setUserReset(false)
  }
  }

  return (
    <div>
    <div className={profile}>
        <ToastContainer/>

        <div className="nav-bar">
            <div className="container nav-content">
                <span><span style={{color : "#F50057"}}>Auth</span>2.0</span>
                <Link to= "/home">Back to Home</Link>
            </div>
        </div>
      {profileCard && (
        <section className="vh-100" style={{ "background-color": "#eee" }}>
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-12 col-xl-4">
                <div class="card" style={{ "border-radius": "15px" }}>
                  <div class="card-body text-center">
                    <div class="mt-3 mb-4">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                        class="rounded-circle img-fluid"
                        style={{ width: "100px" }}
                      />
                    </div>
                    {allDetails && (
                      <div className="allDetails">
                        <div className="userDetails">
                          <label for="exampleInputUsername1">{userName}</label>
                          <button onClick={btnUsername}>
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                          <br />
                          <label for="exampleInputEmail1">{email}</label>
                          <button onClick={btnEmail}>
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                          <br />
                          <label for="exampleInputPassword1">
                            <a
                              href="#"
                              style={{
                                "text-decoration": "none",
                              }}
                            >
                              Change Password
                            </a>
                          </label>
                          <button onClick={btnPassword}>
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                          <br />
                        </div>
                        <div class="mb-4 pb-2">
                          <button
                            type="button"
                            class="btn btn-outline-primary btn-floating"
                          >
                            <i class="fab fa-facebook-f fa-lg"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-primary btn-floating"
                          >
                            <i class="fab fa-twitter fa-lg"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-primary btn-floating"
                          >
                            <i class="fab fa-skype fa-lg"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary btn-rounded btn-lg"
                          onClick={btnProfile}
                        >
                          Reset
                        </button>
                      </div>
                    )}

                    {user && (
                      <div class="form-group">
                        <label for="exampleInputEmail1">UserName</label>
                        <br />
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter Username"
                          value={newUser}
                          onChange={(e) => {
                            setNewUser(e.target.value);
                          }}
                        />
                        <button
                          type="submit"
                          class="btn btn-primary"
                          onClick={async () => {
                            console.log(token , userName)
                            let res = await axios
                              .post(
                                "http://localhost:8000/user/updateUsername",
                                {
                                  user: newUser,
                                  token: token,
                                }
                              )
                              .catch((err) => {
                                if (err.response.status === 404) {
                                  toast.warn(err.response.data);
                                }
                              });

                            if (res.status === 200) {
                              toast("updated Successfully");
                              setUser(false);
                               setAllDetails(true);
                            }
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {Email && (
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <br />
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          value={newEmail}
                          onChange={(e) => {
                            setNewEmail(e.target.value);
                          }}
                        />
                        <button
                          type="submit"
                          class="btn btn-primary"
                          onClick={async () => {
                            let res = await axios
                              .post("http://localhost:8000/user/updateEmail", {
                                email: newEmail,
                                token: token,
                              })
                              .catch((err) => {
                                if (err.response.status === 404) {
                                  toast.warn(err.response.data);
                                }
                              });

                            if (res.status === 200) {
                              toast("updated Successfully");
                              setEmail(false);
                              setAllDetails(true); 
                            }
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {pass && (
                      <div class="form-group">
                        <label for="exampleInputEmail1">PassWord</label>
                        <br />
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter Password"
                          value={newPass}
                          onChange={(e) => {
                            setNewPass(e.target.value);
                          }}
                        />
                        <button
                          type="submit"
                          class="btn btn-primary"
                          onClick={async () => {
                            let res = await axios
                              .post(
                                "http://localhost:8000/user/updatePassword",
                                {
                                  pass: newPass,
                                  token: token,
                                }
                              )
                              .catch((err) => {
                                if (err.response.status === 404) {
                                  toast.warn(err.response.data);
                                }
                              });

                            if (res.status === 200) {
                              toast("updated Successfully");
                              setPass(false);
                            setAllDetails(true);
                            }
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {userReset && (
        <div className="resetForm">
          <div>
            <div class="form-group">
              <label for="exampleInputEmail1">New Username *</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={newUser}
                onChange={(e) => {
                  setNewUser(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">New Email address *</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">New Password *</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary" onClick={ResetAll}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
    <div className={err}>
    <div className="nav-bar">
            <div className="container nav-content">
                <span><span style={{color : "#F50057"}}>U</span>xon</span>
                <Link to= "/home">Back to Home</Link>
            </div>
        </div>
        <div className="warn">
            <img src="Images/warn.svg" alt="" />
        </div>
        <div className="warn-msg">
            <h3>Error Occurs on Server!!</h3>
        </div>
    </div>
    </div>
  );
};

export default Profile;
