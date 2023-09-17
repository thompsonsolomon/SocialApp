import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css";
import { Bricks } from "../../Components/UI/Loader";
import CustomAlert from "../../Components/Constant/CustomAlert";

export default function Register() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    const displayName = FirstName + " " + LastName;
    // const file = event.target[4].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      
      await updateProfile(res.user, {
        displayName,
        // photoURL: downloadURL,
      });

      
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: "",
        coverPhoto: "" ,
        RegisteredDate : new Date().getDate(),
        RegisteredTime :  new Date().getTime()
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      history.push("/");

      // const date = new Date().getTime();

    } catch (err) {
      console.log(err);
      CustomAlert("error", err.message);
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
            <form action="" method="post" onSubmit={handleRegister}>
              <input
                placeholder="First Name"
                type="Text"
                className="loginInput"
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
                autoFocus
                required
              />
              <input
                placeholder="Last Name"
                type="Text"
                className="loginInput"
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
                required
              />

              <input
                required
                className="loginInput"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="email"
              />
              <input
                required
                className="loginInput"
                type="password"
                placeholder="password"
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {Loading ? (
                <div className="RegisterLoading">
                  Loading
                  <Bricks />
                </div>
              ) : (
                <button className="loginButto" type="submit">
                  Sign up
                </button>
              )}
            </form>

            <Link to="/login" className="registerBttn">
              Log into Account
            </Link>
            {Loading && "Uploading and compressing the image please wait..."}
          </div>
        </div>
      </div>
    </div>
  );
}
