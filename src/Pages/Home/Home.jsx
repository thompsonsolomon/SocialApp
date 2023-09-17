import React from "react";
import "./Home.css";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Feed from "../../Components/feeds/feed";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeCon">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
