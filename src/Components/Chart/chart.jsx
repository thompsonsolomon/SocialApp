import React, { useState } from "react";
import ChartfeedSideBAr from "./ChartComponent/ChartfeedSideBAr";
import Chats from "./ChartComponent/Chats";
import ChartSidebar from "./ChartComponent/ShartSideBar";
import "./Chat.scss";
import "./Chat.css";

export default function Chart() {
  const [ToggleSearch, setToggleSearch] = useState(true);

  const handleToggleSideBar = () => {
    setToggleSearch((current) => !current);
  };
  return (
    <div className="ChartContainer">
      <div className="ChartsidebarCon">
        <ChartSidebar />
        <ChartfeedSideBAr />
      </div>
      <div className="ResponsiveChartsidebarCon">
      <div className="ResponsiveButtonCon">

        <button onClick={handleToggleSideBar} className="ResponsiveButton">
        <i className="bi bi-arrow-right"></i>
        </button>
        </div>
        <div
          className="responsiveMenu"
          style={{ display: ToggleSearch ? "none" : "flex" }}
        >
         <div className="ResponsiveButtonCon">
         <button onClick={handleToggleSideBar} className="ResponsiveButton">
            <i className="bi bi-arrow-left"></i>          </button>
         </div>

          <ChartSidebar />
          <ChartfeedSideBAr />
        </div>
      </div>

      <div className="chartfeed">
        <Chats />
      </div>
    </div>
  );
}
