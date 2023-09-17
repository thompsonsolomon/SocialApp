import React from "react";
import { useContext, useEffect, useState } from "react";
import { Communication } from "../../Context/Communication";
import Messages from "../Messages";
import ChatInput from "./ChatInput";
import Cameral from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Chats() {
  const { data } = useContext(Communication);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Chats">
      <div className="chatHead">
        <div className="chatsInfo">
          <div className="chatinfoimg">
            {loading ? (
              <div className="imagetage">
                <div className="dot-spin"></div>
              </div>
            ) : (
              <>
                <Link
                  to={`/profile/${data.user?.uid}/${data.user?.displayName}`}
                >
                  <img
                    src={
                      data.user.photoURL
                        ? data.user.photoURL
                        : "/assets/about/a5.png"
                    }
                    alt=""
                  />
                </Link>
                <span>{data.user?.displayName}</span>
              </>
            )}{" "}
          </div>
          <div className="chatIcons">
            <Link to="/videos">
              <img src={Cameral} alt="" />
            </Link>
            <Link to="/friends">
              <img src={Add} alt="" />
            </Link>
            <img src={More} alt="" />
          </div>
        </div>
      </div>
      <Messages />
      <ChatInput />
    </div>
  );
}
