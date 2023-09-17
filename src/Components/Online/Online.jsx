import React from "react";
import "./Online.css";

export default function Online({ user }) {
  return (
      <li className="rightbarFriend">
        <div className="firghtbarProfileImgCon">
          <img
            src={user.profilePicture}
            alt=""
            className="rightbarprofileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{user.userName}</span>
      </li>
      
  );
}
