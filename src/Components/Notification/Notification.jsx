import "./Notification.css";
import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  TwitterTweetEmbed,
} from "react-twitter-embed";
export default function Notification() {
  return (
    <div className="notificaton">
      <div className="notificationwrapper">
        <div className="sidebarnotifica">
        <Sidebar Notification />
        </div>
        <div className="notificationCon">
         <div className="notholder">
           <TwitterTweetEmbed tweetId={"858551177860055040"} />
          <TwitterTweetEmbed tweetId={"858551177860055040"} />
          <TwitterTweetEmbed tweetId={"858551177860055040"} />
         </div>
        </div>{" "}
      </div>
    </div>
  );
}
