import React from "react";
import "./StatusCon.css";
import { UserStatus } from "../../DummyData";
import Status from "../Status/Status";
import Topbar from "../Topbar/Topbar";

export default function StatusCon() {
  return (
    <div className="StatusCon">
      <Topbar />
      <div className="statue">
        <div className="Status">
          {UserStatus.map((s) => (
            <Status key={s.id} Statuses={s} />
          ))}
        </div>
        <div className="Statuses">
          <img className="stateprofilePicture" src={UserStatus.filter((u) => u.id)[0].profilePicture} alt="" />
        </div>
      </div>
    </div>
  );
}
