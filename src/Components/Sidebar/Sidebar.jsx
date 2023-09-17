import React from "react";
import "./Sidebar.css";
// import { Users } from '../../DummyData'
import Status from "../Status/Status";
import { UserStatus } from "../../DummyData";
import {  NavLink } from "react-router-dom/cjs/react-router-dom";
export default function Sidebar({ Notification }) {
  return (
    <div className="Sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarulcon">
          <ul className="sidebarlist">         
            <li className="sidebarlistItem"  >
              <NavLink to="/feed">
                <span className="sidebarIcon">
                {/* <i className="bi bi-wifi"></i> */}
                <i className="bi bi-house-fill"></i>
                </span>
                <span className="sidebarlistText">Feed</span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <NavLink to="/charts">
                <span className="sidebarIcon">
                  <i className="bi bi-chat-left-text-fill"></i>
                </span>
                <span className="sidebarlistText">Chats</span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <NavLink to="/videos">
                <span className="sidebarIcon">
                  <i className="bi bi-file-play-fill"></i>
                </span>
                <span className="sidebarlistText">Videos</span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <NavLink to="/friends">
                <span className="sidebarIcon">
                  <i className="bi bi-people-fill"></i>
                </span>
                <span className="sidebarlistText">Groups</span>
              </NavLink>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-bookmark-fill"></i>
              </span>
              <span className="sidebarlistText">Bookmarks</span>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-question-circle"></i>
              </span>
              <span className="sidebarlistText">Questions</span>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-bag"></i>
              </span>
              <span className="sidebarlistText">Jobs</span>
            </li>

            <li className="sidebarlistItem">
              <span className="sidebarIcon">
                <i className="bi bi-calendar4-event"></i>
              </span>
              <span className="sidebarlistText">Events</span>
            </li>

          </ul>

          <button className="sidebarButton">Show More</button>

          <div className="responsiveSidebarButton">
          <i className="bi bi-list  sidebarHambugget "></i>
          <span className="sidebarhambuggerText">Show More </span>
          </div>


          <hr className="sidebaHr" />
        </div>
        <div>
          {!Notification ? (
            <ul className="sidebarFriendList">
              <h3> STATUS</h3>

              {UserStatus.map((s) => (
                <Status key={s.id} Statuses={s} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
