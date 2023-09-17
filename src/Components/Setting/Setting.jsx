import React from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Theme from "../UI/Theme";
import { auth } from "../../firebase";
import "./Setting.scss";

export default function Setting() {
  return (
    <div className="SettingCon">
      <div className="Setti">
      

        <Link to="/ForgotPassword">
          {" "}
          <button className="SettingButton">Reset Password</button>
        </Link>

        <button onClick={() => signOut(auth)} className="SettingButton">
          Log Out
        </button>

        <Theme />
        <Link to="/friends">
          {" "}
          <button className="SettingButton">Friends</button>
        </Link>

        <Link to="feed">
          {" "}
          <button className="SettingButton">Back</button>
        </Link>
      </div>
    </div>
  );
}
