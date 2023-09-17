import React from "react";
// import { Users } from '../../DummyData'
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { AuthContext } from "../../Context/AuthContext";
import DummyImg from "../../img/placeholder.png";

export default function ChartSidebar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="ChatSidebar">
      <div className="sidebarWrapper">
        <div className="sidebarulconhdh">
          <ul className="sidebarlist">
            <li className="sidebarlistItem">
              <NavLink to="/feed">
                <span className="sidebarIcon">
                  <i className="bi bi-house-fill"></i>
                </span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <NavLink to="/charts">
                <span className="sidebarIcon">
                  <i className="bi bi-chat-left-text-fill    active"></i>
                </span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <NavLink to="/videos">
                <span className="sidebarIcon">
                  <i className="bi bi-file-play-fill"></i>
                </span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <NavLink to="/friends">
                <span className="sidebarIcon">
                  <i className="bi bi-people-fill"></i>
                </span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-bookmark-fill"></i>
              </span>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-question-circle"></i>
              </span>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-bag"></i>
              </span>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-calendar4-event"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <li className="sidebarlistItem">
        <span className="sidebarIcon">
          <img
            className="userImage"
            src={currentUser.photoURL ? currentUser.photoURL : DummyImg}
            alt=""
          />
        </span>
      </li>
    </div>
  );
}
