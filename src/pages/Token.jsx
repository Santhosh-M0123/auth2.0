import { useEffect, useState } from "react";
import axios from "axios"
import "../components/Token.css";
import {Link} from "react-router-dom";

const Token = () => {
    const [token, setToken] = useState("");
    const [popup, setPopup] = useState(false);
    const [newAccount, setNewAccount] = useState(false);
    const [tokenRev, setTokenRev] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [imgclass,setImgclass] = useState("img-display");
    let [form,setForm] = useState("acc-frm");

    const btnRevoke = async (e) => {
        e.preventDefault();
        console.log(token);

        if (token === "") {
            setMessage("Please insert your token !");
        } else {
            setPopup(true);
            setMessage('')
        }
    };

    const newAcc = async (e) => {
        e.preventDefault();
        setNewAccount(true);
        setPopup(false);
        setTokenRev(false);
    };

    const createAcc = async (e) => {
        e.preventDefault();

        if (username === "" || password === "" || email === "") {
            setMessage("Please fill nescessary details..");
        } else {
            let res = await axios.post("http://localhost:8000/revoke/" , {
                tokenId : token,
                email : email,
                pass : password,
                user : username
            });
            if(res.status === 200){
                setForm("hide-form");
                setImgclass("display-img");
            }else{
                window.alert("Server Error!");
            }
        }
    };

    useEffect(() => {}, [btnRevoke]);

    return (
        <div className="client">
            {tokenRev && (
                <div className="tokRevoke">
                    <form>
                        <div class="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                class="form-label">
                                Please enter the Token Id from your email
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={token}
                                onChange={(e) => {
                                    setToken(e.target.value);
                                }}
                                placeholder="Insert your Token Id"
                            />
                            <button
                                type="submit"
                                class="btn btn-primary"
                                onClick={btnRevoke}>
                                Create
                            </button>
                            <p className="notify" style={{'color' : 'crimson'}}>{message}</p>
                        </div>
                    </form>
                </div>
            )}

            {popup && (
                <div className="popup">
                    <div class="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            class="form-label">
                            Are you want to block the Account and reset your
                            Login Credentials
                        </label>
                        <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={newAcc}>
                            Yes
                        </button>
                        <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={() => {setPopup(false)}}>
                            No
                        </button>
                    </div>
                </div>
            )}

            {newAccount && (
                <div>
                <div className={form}>
                    <form>
                        <div class="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                class="form-label">
                                Email address *
                            </label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder='Enter a new E-mail'
                            />
                            <div
                                id="emailHelp"
                                class="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label
                                htmlFor="exampleInputUsername1"
                                class="form-label">
                                Username *
                            </label>
                            <input
                                type="username"
                                class="form-control"
                                id="exampleInputUsername1"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                placeholder='Enter the new Username'
                            />
                        </div>
                        <div class="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                class="form-label">
                                Password *
                            </label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder='Enter the new Password'
                            />
                        </div>
                        <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="exampleCheck1"
                            />
                            <label
                                class="form-check-label"
                                htmlFor="exampleCheck1">
                                Check me out
                            </label>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={createAcc}>
                            Create
                        </button>
                        <p className="notify">{message}</p>
                    </form>
                </div>
                <div className={imgclass}>
                    <div className="img-client">
                        <img src="Images/success.svg" alt="success" />
                    </div>
                    <div className="success">
                        <h4>Account Credentials changed Successfully</h4>
                        <Link to="/">Login Here</Link>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default Token;
