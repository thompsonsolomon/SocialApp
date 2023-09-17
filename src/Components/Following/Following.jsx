import React from "react";
import "./Following.css";
export default function Following({ followers }) {
  console.log(followers.userInfo);

  return (
    <div className="rightbarFollowing">
      {followers[1].userInfo.photoURL && (
        <img
          className="followingImg"
          src={followers[1].userInfo.photoURL}
          alt=""
        />
      )}
      <span className="followingName">{followers[1].userInfo.displayName}</span>
    </div>
  );
}
