import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { AuthContext } from "../../Context/AuthContext";
import DummyImg from "../../img/placeholder.png";

export default function ChartNav() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="ChartNav">
      <div className="userContainer">
        <Link to={`/profile/${currentUser.uid}/${currentUser.displayName}`}>
          <img
            src={currentUser.photoURL ? currentUser.photoURL : DummyImg}
            alt=""
          />
        </Link>
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
}
