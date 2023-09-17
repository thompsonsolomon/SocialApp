import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import { Fire } from "../../Components/UI/Loader";
import { sendPasswordResetEmail } from "firebase/auth";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../Components/Context/AuthContext";
import Swal from "sweetalert2";

export default function ForgottenPassword() {
  const [Email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const HandleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(Email);
      setLoading(false);
      Swal.fire({
        icon: "info",
        title: "",
        text: "Check your mail box for further instructions!",
      });

    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWraper">
        <div className="loginLeft">
          <h3 className="Loginlogo">ReySocial</h3>
          <span className="loginDesc">
            Reset PassWord to Connect back with friends
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="error">{Error}</div>
            <form action="/feed" method="post" onSubmit={HandleForgotPassword}>
              <input
                placeholder=" Email"
                type="email"
                className="loginInput"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={!currentUser ? "" : currentUser.email}
                required
              />

              {Loading ? (
                <div className="RegisterLoading">
                  Loading
                  <Fire />
                </div>
              ) : (
                <button className="loginButto" type="submit">
                  Reset Password{" "}
                </button>
              )}
            </form>
            <Link className="loginregisterBttn" to="/login">
              {" "}
              Cancle...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
