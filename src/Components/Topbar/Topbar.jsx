import React from "react";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { AuthContext } from "../Context/AuthContext";
import "./Topbar.css";
import DummyImg from "../img/placeholder.png";

export default function Topbar() {
  const [ToggleSearch, setToggleSearch] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");

  // const handleViberate = () => {
  //   window.navigator.vibrate([300, 100, 300, 100]);
  // };

  // currentUser.photoURL ? setProfile(currentUser.photoURL): setProfile(DummyImg);
  // useEffect(() => {
  //   if (profile) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [profile]);

  const ToggleResSearch = () => {
    setToggleSearch((current) => !current);
  };
  return (
    <>
      <div className="topbarCon">
        <div className="top">
          <div className="topbarLeft">
            <Link to="/feed">
              {" "}
              <span className="logo">ReySocial</span>
            </Link>
          </div>

          <div className="topbarCenter">
            <div className="searchbar">
              <span className="searchIcon">
                <i className="bi bi-search"></i>{" "}
              </span>
              <input
                type="text"
                placeholder="Search for friend, Post or Video"
                className="searchInput"
              />
            </div>
          </div>
          <div className="topbarRight">
            <div className="toplinks">
              <Link to="/feed">
                {" "}
                <span className="toplink">Home</span>
              </Link>
              <Link to="/timeline">
                {" "}
                <span className="toplink">Timeline</span>
              </Link>
            </div>
            <div className="topbarIcon">
              <Link to="/friends">
                {" "}
                <div className="topbarIconItem" title="Friends">
                  <i className="bi bi-person-fill"></i>
                  <span className="topbarIconBadge">1</span>
                </div>
              </Link>

              <Link to="/charts" title="Chats">
                <div className="topbarIconItem">
                  <i className="bi bi-chat-dots-fill"></i>
                  <span className="topbarIconBadge">1</span>
                </div>
              </Link>

              <Link to="/notification" title="Notification">
                {" "}
                <div className="topbarIconItem">
                  <i className="bi bi-bell-fill"></i>
                  <span className="topbarIconBadge">33</span>
                </div>
              </Link>
            </div>
            <Link to={`/profile/${currentUser.uid}/${currentUser.displayName}`}>
              {" "}
              {loading ? (
                <div className="stage">
                  <div className="dot-spin"></div>
                </div>
              ) : (
                <div>
                  <img
                    src={

                      currentUser.photoURL ? currentUser.photoURL : DummyImg
                    }
                    alt=""
                    className="topbarImg"
                  />
                </div>
              )}{" "}
            </Link>
          </div>
        </div>
      </div>

      {/* ResponsiveNess Nav BAr  */}
      <div className="ResponsivetopbarCon">
        <div className="responsiveTophead">
          <div className="topbarLeft">
            <Link to="/feed">
              {" "}
              <span className="logo">ReySocial</span>
            </Link>
          </div>
          <div
            className="responsiveSearch"
            style={{ display: ToggleSearch ? "none" : "flex" }}
          >
            <input type="text" placeholder="Search" name="" id="" />
            <i className="bi bi-search responsiveSearchIcon "></i>
            <i
              className="bi bi-list responsiveSearchIcon "
              onClick={() =>ToggleResSearch}
            ></i>
          </div>
          <div className="responsiveTopbarWrite">
            <i className="bi bi-search  respon" onClick={() =>ToggleResSearch}></i>
            <Link to="/setting">
              <i className="bi bi-list  respon"></i>
            </Link>
            <div className="SettingContainer">
              <Link to="/setting">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <ul className="Topbarlist">
          <li className="TopbarlistItem">
            <NavLink className="TopbarA" to="/feed">
              <span className="sidebarIcon">
                {/* <i className="bi bi-wifi"></i> */}
                <i className="bi bi-house-fill"></i>
              </span>
            </NavLink>
          </li>

          <li className="TopbarlistItem">
            <NavLink className="TopbarA" to="/friends">
              <div className="topbarIconItem" title="Friends">
                <i className="bi bi-people-fill"></i>
                <span className="topbarIconBadge">1</span>
              </div>
            </NavLink>
          </li>
          <li className="TopbarlistItem">
            <NavLink className="TopbarA" to="/charts">
              <div className="topbarIconItem">
                <i className="bi bi-chat-dots-fill"></i>
                <span className="topbarIconBadge">1</span>
              </div>
            </NavLink>
          </li>

          <li className="TopbarlistItem">
            <NavLink className="TopbarA" to="/notification">
              <div className="topbarIconItem">
                <i className="bi bi-bell-fill"></i>
                <span className="topbarIconBadge">33</span>
              </div>
            </NavLink>
          </li>

          <li className="TopbarlistItem">
            <NavLink className="TopbarA" to="/StatusCon">
              <span className="sidebarIcon">
                <i className="bi bi-camera-fill"></i>
              </span>
            </NavLink>
          </li>
        </ul>{" "}
      </div>
    </>
  );
}
