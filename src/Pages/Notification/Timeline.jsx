import React from "react";
import {
  TwitterTimelineEmbed,
  // TwitterShareButton,
  // TwitterTweetEmbed,
} from "react-twitter-embed";
import Topbar from "../../Components/Topbar/Topbar";

export default function Timeline() {
  return (
    <div className="Timeline">
      <Topbar />
     <div className="timelineCon">
     <div className="TimelineContainer">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="cleverqazi"
          options={{ height: 400 }}
        />
      </div>
     </div>
    </div>
  );
}

//https://www.youtube.com/watch?v=cS94eDcTe44
