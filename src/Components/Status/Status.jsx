import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useStateValue } from "../Context/CommentStateProvider";
import "./Status.css";
export default function Status({ Statuses }) {
  const [dispatch] = useStateValue();
  const [{ StatusID }] = useStateValue();
  const handleStatus = () => {
    dispatch({
      type: "ADD_Status_ID",
    });
    dispatch({
      type: "REMOVE_Status_ID",
      id: Statuses.id,
    });
    console.log(StatusID)
    alert(StatusID)
  };


  return (
    <div className="SidebarStatus">
      <div className="stdebarStatusWrapper">
        <div className="sidebarStatusCon">
          <Link to="/StatusCon" onClick={handleStatus}>
            <img
              className="SidebarStatusImg"
              style={{ border: ` 4px ${Statuses.statusAmount}  green` }}
              src={Statuses.profilePicture}
              alt=""
            />
          </Link>
          <div className="sidebarStatusInfo">
            <h5 className="StatusName">{Statuses.userName}</h5>
            <span className="statusTime">{Statuses.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
