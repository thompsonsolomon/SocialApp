import React, { useContext, useEffect } from "react";
import "./Post.css";
import { useState } from "react/cjs/react.development";
import Comment from "../../Components/Reaction/Comment/Comment";
import Like from "../../Components/Reaction/Like/Like";
import { Link } from "react-router-dom";
import DummyImg from "../img/about/a3.png";
import { useStateValue } from "../Context/CommentStateProvider";
import { AuthContext } from "../Context/AuthContext";
import { Gathering } from "../UI/Loader";
import { format } from "timeago.js";

export default function Post({
  displayName,
  verified,
  userName,
  text,
  imageUrl,
  avatar,
  likes,
  comment,
  backGround,
  userId,
  id,
  createdAt,
}) {
  const [loading, setLoading] = useState(false);
  const [ToggleComment, setToggleComment] = useState(false);
  const [dispatch] = useStateValue();
  const { currentUser } = useContext(AuthContext);
  const [showMore, setshowMore] = useState(false);

  useEffect(() => {
    const sub = () => {
      if (!avatar || text || imageUrl) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };

    return () => {
      sub();
    };
  }, [avatar, text, imageUrl]);
  // function truncate(str, n) {
  //   return str?.length > n ? str.substr(0, n - 1) + "...." : str;
  // }

  const HandleSendLikeId = () => {
    dispatch({
      type: "REMOVE_LIKE_ID",
    });
    dispatch({
      type: "ADD_LIKE_ID",
      id: id,
    });
  };

  const handleComment = () => {
    setToggleComment((current) => !current);
    dispatch({
      type: "REMOVE_COMMENT_ID",
    });
    dispatch({
      type: "ADD_COMMENT_ID",
      id: id,
    });
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {loading ? (
              <div class="imagetage">
                <div class="dot-windmill"></div>
              </div>
            ) : (
              <Link
                to={`/profile/${currentUser.uid}/${currentUser.displayName}`}
              >
                {avatar ? (
                  <img src={avatar} alt="" className="postProfileImg" />
                ) : (
                  <img src={DummyImg} alt="" className="postProfileImg" />
                )}
              </Link>
            )}{" "}
            <span className="postUserName">{displayName}</span>
            {verified && (
              <>
                <i
                  className="bi bi-patch-check-fill"
                  style={{
                    color: "#1877f2",
                    marginRight: "3px",
                    fontSize: "18px",
                  }}
                ></i>
                <span className="postSpecial">@</span>
              </>
            )}{" "}
            <span className="postSpecial">{userName}</span>
            <span style={{ fontSize: "10px", marginLeft: "5px" }}>
              {format(createdAt)}
            </span>
          </div>
          <div className="postTopRight">
            <i className="bi bi-three-dots-vertical"></i>
          </div>
        </div>

        {imageUrl ? (
          <div className="postCenter">
            <span className="postText">{text}</span>
            {loading ? (
              <div>
                <Gathering />
              </div>
            ) : (
              <img src={imageUrl} className="postImg" alt="" />
            )}{" "}
          </div>
        ) : (
          <div
            className="postCenterNoimg"
            style={{
              
              backgroundImage: `${backGround ? backGround : "linear-gradient(to right, red,green, blue, black)" }`,
              backgroundColor: "blue",
            }}
          >
            <div className="postTextCon">
              <span className="postText">
                {showMore ? text : `${text.substring(0, 250)}`}
              </span>
              <Link onClick={() => setshowMore(!showMore)} to="/">
                {showMore ? " See Less" : "See more "}
              </Link>
            </div>
          </div>
        )}
        <div>
          <div className="postBottom">
            <div className="postbuttomLeft">
              <span>{likes?.length}</span>
              <Like onClick={HandleSendLikeId} id={id} likes={likes} />
            </div>
            <div className="postbuttomRight">
              <div>
                <Link to="" onClick={handleComment}>
                  <span className="postcomentText" onClick={handleComment}>
                    {comment?.length} Comments
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="commentContaine"
            style={{ display: ToggleComment ? "block" : "none" }}
          >
            {/* <NavLink to="/"> */}
            <Comment ComentId={id} />
            {/* </NavLink> */}
          </div>
        </div>
      </div>
    </div>
  );
}
