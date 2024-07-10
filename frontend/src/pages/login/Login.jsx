import React, { useRef, useState } from "react";
import "./login.scss";
import {
  BiSolidHide,
  BiSolidLockAlt,
  BiSolidShow,
  BiSolidUser,
} from "react-icons/bi";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Login() {
  const [isHide, setIsHide] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const credential = {
      username: usernameRef.current.value,
      password: usernameRef.current.value,
    };
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/login",
        credential,
        config
      );
      setUser(res.data);
    } catch (error) {
      console.log(error.response.data);
      setLoginError(error.response.data);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <span>Login</span>
        {loginError ? <p className="error">{loginError}</p> : ""}
        <div className="login-form">
          <form onSubmit={handleFormSubmit}>
            <div className="username-field">
              <BiSolidUser className="icon" />
              <input type="text" placeholder="username" ref={usernameRef} />
            </div>
            <div className="password-field">
              <BiSolidLockAlt className="icon" />
              <input
                type={isHide ? "password" : "text"}
                placeholder="password"
                ref={passwordRef}
              />
              {isHide ? (
                <BiSolidHide
                  className="hide-icon"
                  onClick={() => setIsHide(!isHide)}
                />
              ) : (
                <BiSolidShow
                  className="hide-icon"
                  onClick={() => setIsHide(!isHide)}
                />
              )}
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
