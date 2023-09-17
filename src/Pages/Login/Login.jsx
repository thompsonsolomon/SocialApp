import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Spin } from "../../Components/UI/Loader";
import CustomAlert from "../../Components/Constant/CustomAlert";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const history = useHistory();
  const HandleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      history.pust("/");
      setLoading(false);
    } catch (error) {
      setEmail("");
      setPassword("");
      CustomAlert("error", error.message);
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="loginWraper">
        <div className="loginLeft">
          <h3 className="Loginlogo">ReySocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ReySocial
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form action="/feed" method="post" onSubmit={HandleLogin}>
              <input
                placeholder=" Email"
                type="email"
                className="loginInput"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                required
              />

              <input
                type="Password"
                placeholder="Password"
                className="loginInput"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                required
              />

              <button disabled={Loading} className="loginButto" type="submit">
                {Loading ? (
                    <Spin />
                ) : (
                  "Log In"
                )}
              </button>
            </form>
            <Link className="LoginForgot" to="/ForgotPassword">
              {" "}
              Forgot Password?{" "}
            </Link>
            <Link className="loginregisterBttn" to="/register">
              {" "}
              Create a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
