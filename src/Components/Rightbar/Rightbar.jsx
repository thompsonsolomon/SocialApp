import React from "react";
import "./Rightbar.css";
import Online from "../Online/Online";
import { Friends } from "../../DummyData";
import Following from "../Following/Following";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import birthday from "../img/img.png";
import Theme from "../UI/Theme";
import { Edit } from "@material-ui/icons";

export default function Rightbar({ profile, Data }) {
  const randomImg = Math.floor(Math.random() * 6 + 1);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={birthday} alt="" className="birthdayimg" />
          <span className="birthdayText">
            <b>Rey Thompson</b> and <b> 3 others </b> have a birthday today.
          </span>
        </div>
        {
          <div>
            <img
              src={`assets/about/a${randomImg}.png`}
              alt=""
              className="RightbarAdd"
            />
          </div>
        }
        <div className="rightbaractiveFriends">
          <h4 className="rightbartitle">Active Friends</h4>
          <ul className="rightbarFriendlist">
            {Friends.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
  const { currentUser } = useContext(AuthContext);
    const [follow, setfollow] = useState([]);
    useEffect(() => {
      const FindAllFriends = () => {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            setfollow(doc.data());
          }
        );
        currentUser.uid && unsub();
      };

      return () => {
        FindAllFriends();
      };
    }, [currentUser.uid]);

    return (
      <>
        <h4 className="RightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{Data.City}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{Data.From}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{Data.Relationship}</span>
          </div>

          <div className="UpdateProfileButton">
            <Link to="/UpdateProfile">
              <span className="rightbarInfoKey">Update Profile</span>
              <Edit />
            </Link>
          </div>
        </div>
        <h4 className="RightbarTitle">Followers </h4>
        <div className="rightbarFollowings">
          {follow && follow ? (
            Object.entries(follow)?.map((follows) => (
              <Following key={follows[0]} followers={follows} />
            ))
          ) : (
            <Link to="/friends">
              You have no Followers yet Add up new Friends
            </Link>
          )}
        </div>
        <div>
          <Link to="/friends">
            {" "}
            <button style={{ marginTop: "20px" }} className="sidebarButton">
              Friends
            </button>
          </Link>

          <Link to="/ForgotPassword">
            {" "}
            <button style={{ marginTop: "20px" }} className="sidebarButton">
              Reset Password
            </button>
          </Link>

          <button
            onClick={() => signOut(auth)}
            style={{ marginTop: "20px" }}
            className="sidebarButton"
          >
            Log Out
          </button>
          <Theme />
        </div>
      </>
    );
  };
  return (
    <div className="Rightbar">
      <div className="rightWraper">
        {profile ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
