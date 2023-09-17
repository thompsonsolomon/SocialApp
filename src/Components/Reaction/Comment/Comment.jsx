import React from "react";
import "./Comment.css";
import {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react/cjs/react.development";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../../firebase";
import { useStateValue } from "../../Context/CommentStateProvider";
import { format } from "timeago.js";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CustomAlert from "../../Constant/CustomAlert";

export default function Comment() {
  const [commentText, sethandleCommentText] = useState("");
  const [Comments, setComments] = useState({});
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();
  const [{ ComentID }] = useStateValue();

  function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }

  const id = ComentID && ComentID[1];

  useEffect(() => {
    const OnSub = () => {
      const docRef = doc(db, "post", id);
      onSnapshot(docRef, (snapshot) => {
        setComments(snapshot.data().comments);
      });
    };

    return () => {
      OnSub();
    };
  }, [id]);

  const HandleaddComment = async (e) => {
    e.preventDefault();
    const commentRef = doc(db, "post", id);
    try {
      await updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentUser.uid,
          userName: currentUser.displayName,
          comment: commentText,
          Photo: currentUser.photoUrl,
          createdAt: new Date().getTime(),
          commentId: getUUID(),
        }),
      });
      CustomAlert("success", "Comment Added");
      sethandleCommentText("");
    } catch (err) {
      CustomAlert("error", err.message);
      sethandleCommentText("");
    }
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentText]);
  return (
    <>
      <div className="Comments">
        {Comments.length > 0 ? (
          <div>
            <h3>Comments</h3>
            <div className="allComment">
              <div>
                {Comments &&
                  Comments.map((cm) => (
                    <Fragment key={cm.commentId}>
                      <div className="commenterInfo">
                        <Link to={`/profile/${cm.user}/${cm.userName}`}>
                          <img src={cm.Photo} alt="" className="commenterImg" />
                        </Link>
                        <span className="commenterName">{cm.userName}</span>
                      </div>
                      <div className="commentContainer">
                        <p>{cm.comment}</p>
                        <small>{format(cm.createdAt)}</small>
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>

            <div className="commentInput">
              <h4>Add a new Comment </h4>
              <form action="/" method="post" className="CommentForm">
                <textarea
                  required
                  autoFocus
                  placeholder={"Drop comment na " + currentUser.displayName}
                  name=""
                  id=""
                  className="ComenttextArea"
                  cols="30"
                  rows="10"
                  onChange={(e) => sethandleCommentText(e.target.value)}
                  value={commentText}
                />
                <button type="submit" onClick={HandleaddComment}>
                  {commentText.length > 1 ? "Send" : "Comment"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <h3> No Comment Yet Add A new One</h3>

            <form action="/" method="post" className="CommentForm">
              <textarea
                required
                autoFocus
                placeholder={"Drop comment na " + currentUser.displayName}
                name=""
                id=""
                className="ComenttextArea"
                cols="30"
                rows="10"
                onChange={(e) => sethandleCommentText(e.target.value)}
                value={commentText}
              />
              <button type="submit" onClick={HandleaddComment}>
                {commentText.length > 1 ? "Send" : "Comment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
