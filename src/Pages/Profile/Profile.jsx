import React, { useEffect } from "react";
import "./Profile.css";
import Feed from "../../Components/feeds/feed";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { useContext, useState } from "react/cjs/react.development";
import { AuthContext } from "../../Components/Context/AuthContext";
import { useParams } from "react-router";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "@material-ui/core";
import DummyImg from "../../Components/img/placeholder.png";
import CustomAlert from "../../Components/Constant/CustomAlert";
import { profileDatas } from "../../DummyData";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [isProfile, setisProfile] = useState(true);
  const [isCover, setisCover] = useState(true);
  const [isProfileOwner, setIsProfileOwner] = useState([]);
  const [follow, setfollow] = useState([]);
  const [ProfileData, setProfileData] = useState(profileDatas[0]);
  const params = useParams();

  const ToggleProfile = () => {
    setisProfile((current) => !current);
  };
  // https://www.ssyoutube.com/watch?v=jx5hdo50a2M

  // https://www.ssyoutube.com/watch?v=jx5hdo50a2M
  const ToggleCover = () => {
    setisCover((current) => !current);
  };

  useEffect(() => {
    const UserData = () => {};
  }, [params.userName]);

  // get profile details
  useEffect(() => {
    const getProfileOwner = () => {
      const unsub = onSnapshot(doc(db, "users", params.id), (doc) => {
        if (doc.data()) {
          setIsProfileOwner(doc.data());
        } else {
          setIsProfileOwner(currentUser);
          CustomAlert("error", "user you search does not exist");
        }
      });
      return () => {
        unsub();
      };
    };

    params.id && getProfileOwner();
  }, [params.id]);

  useEffect(() => {
    const getFollowingfriends = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", isProfileOwner.uid),
        (doc) => {
          setfollow(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    isProfileOwner.uid && getFollowingfriends();
  }, [isProfileOwner && isProfileOwner.uid]);

  return (
    <>
      <Topbar />
      <div className="ProfileCon">
        <Sidebar />

        <div className="profileRight">
          {/* cover big  */}

          <div
            className="imageBig"
            style={{ display: isCover ? "none" : "flex" }}
            onClick={ToggleCover}
          >
            <img
              src={
                ProfileData.coverUrl
                  ? ProfileData.coverUrl
                  : "/assets/about/a5.png"
              }
              alt="Cover Img "
              className="profileUserImgBig"
            />
          </div>

          {/* profile big  */}
          <div
            className="imageBig"
            style={{ display: isProfile ? "none" : "flex" }}
            onClick={() => ToggleProfile}
          >
            <img
              src={isProfileOwner.photoURL ? isProfileOwner.photoURL : DummyImg}
              alt="profile"
              className="profileUserImgBig"
            />
          </div>

          <div className="profileRightTop">
            <div className="ProfileCover">
              {/* cover photo  */}
              <img
                onClick={() => ToggleCover}
                src={
                  ProfileData.coverUrl
                    ? ProfileData.coverUrl
                    : "/assets/about/a5.png"
                }
                alt="cover "
                className="profileCoverImg"
              />

              {/* profile image  */}
              <img
                onClick={() => ToggleProfile}
                src={
                  isProfileOwner.photoURL ? isProfileOwner.photoURL : DummyImg
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{isProfileOwner.displayName}</h4>
              <span className="profileDescription">
                <div>{ProfileData.Bio}</div>
                <div className="update">
                  <Link to="/UpdateProfile">
                    <span className="rightbarInfoKey">Update Profile</span>
                    <Edit />
                  </Link>

                  <CopyToClipboard
                    text={`localhost:3001/profile/${params.id}/${params.userName}`}
                  >
                    <Button
                      variant="contained"
                      className="CopyToClipBoardButton"
                      fullWidth
                    >
                      Copy ID
                    </Button>
                  </CopyToClipboard>
                </div>
              </span>

              <div className="ResponsiveOverallContainer">
                <div className="ResponsiveProfileUsers">
                  {follow && follow.length === 0 ? (
                    <Link to="/friends">
                      You have no Followers yet Add up new Friends
                    </Link>
                  ) : (
                    follow &&
                    follow.map((folo) => {
                      return (
                        <div
                          className="ResponsiveProfileUserCon"
                          key={folo[1].userInfo.displayName}
                        >
                          <img
                            className="ResponsivefollowingImg"
                            // src="/assets/about/a5.png"
                            src={folo[1].userInfo.photoURL}
                            alt=""
                          />
                          <span className="ResponsivefollowingName">
                            {folo[1].userInfo.displayName}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="profileRightButtom">
            <Feed username={params.userName} />
            <Rightbar profile Data={ProfileData} />
          </div>
        </div>
      </div>
    </>
  );
}
