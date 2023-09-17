import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { db, storage } from "../../firebase";
import { AuthContext } from "../Context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./Shere.css";
import DummyImg from "../img/placeholder.png";
import Swal from "sweetalert2";
import CustomAlert from "../Constant/CustomAlert";

export default function Share() {
  const [PostText, setPostText] = useState("");
  const [PostImg, setPostImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const avatar = currentUser.photoURL;
  const [verif, setVerif] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Shareloading, setShareLoading] = useState(false);
  const [error, setError] = useState("");
  const userName = currentUser.displayName;
  //  username
  const Uname = userName.split(" ")[0];
  // displaName
  const Disname = userName.split(" ")[1];

  useEffect(() => {
    if (PostText !== null && PostImg !== null) {
      setVerif(true);
    } else {
      setVerif(false);
    }
  }, [PostText, PostImg]);

  const HandleSendPost = async (e) => {
    e.preventDefault();
    setShareLoading(true);
    const PostId = currentUser.uid;
    console.log(PostImg);

    try {
      if (PostImg) {
        const storageRef = ref(storage, PostId);

        const uploadPostImage = uploadBytesResumable(storageRef, PostImg);

        uploadPostImage.on(
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadPostImage.snapshot.ref).then(
              async (downloadURL) => {
                const PostRef = collection(db, "Addpost");
                await addDoc(PostRef, {
                  text: PostText,
                  avatar,
                  imageUrl: downloadURL,
                  verified: verif,
                  displayName: Disname,
                  userName: Uname,
                  userId: currentUser.uid,
                  createdAt: new Date().getTime(),
                  likes: [],
                  comments: [],
                })
                  .then(() => {
                    CustomAlert("success", "Post Added");
                  })
                  .catch((err) => {
                    setError(err.message);
                    CustomAlert("error", " error while adding post");
                    PostText("");
                    PostImg(null);
                    setShareLoading(false);
                  });
              }
            );
          }
        );
      } else {
        const PostRef = collection(db, "Addpost");
        await addDoc(PostRef, {
          text: PostText,
          avatar,
          imageUrl: null,
          verified: verif,
          displayName: currentUser.displayName,
          userName: currentUser.displayName,
          userId: currentUser.uid,
          backGround: ` linear-gradient( ${Math.floor(
            Math.random() * 360 + 1
          )}deg,transparent,rgba(500, ${Math.floor(
            Math.random() * 360 + 1
          )}, 4, 0.${Math.floor(Math.random() * 9 + 1)}1),
          rgba(500, ${Math.floor(Math.random() * 360 + 1)}, 4, 0.${Math.floor(
            Math.random() * 9 + 1
          )}1)
          )`,
          createdAt: new Date().getTime(),
          likes: [],
          comments: [],
        });
      }
    } catch (err) {
      console.log("error");

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
      });
      PostText("");
      PostImg(null);
      setShareLoading(false);
    }
  };
  return (
    <div className="share">
      <form action="/" method="post">
        <div className="shareWrapper">
          <div className="shareTop">
            {/* <VoiceNote /> */}
            {error && <div>{error.message}</div>}
            <Link to={`/profile/${currentUser.uid}/${currentUser.displayName}`}>
              <div>
                <img
                  src={currentUser.photoURL ? currentUser.photoURL : DummyImg}
                  alt="profileImg"
                  className="shareProfile"
                />
              </div>
            </Link>
            <div className="inputCon">
              <input
                type="text"
                value={PostText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={`What's happening? ${Disname}`}
                className="shereInput"
              />
            </div>
          </div>
          <div className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <input
                  type="file"
                  name=""
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setPostImg(e.target.files[0])}
                />
                <label htmlFor="file">
                  <span className="shareIcon" style={{ color: "tomato" }}>
                    <i className="bi bi-camera-fill"></i>
                  </span>
                  <span className="shareOptionText">
                    Photo <span className="disturbingmylife">or Video</span>
                  </span>
                </label>
              </div>
              <div className="shareOption">
                {/* <PerMidea > */}
                <span className="shareIcon" style={{ color: "blue" }}>
                  <i className="bi bi-tag-fill"></i>
                </span>
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                {/* <PerMidea > */}
                <span className="shareIcon" style={{ color: "green" }}>
                  <i className="bi bi-geo-alt-fill"></i>
                </span>
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                {/* <PerMidea > */}
                <span className="shareIcon" style={{ color: "gold" }}>
                  <i className="bi bi-emoji-heart-eyes-fill"></i>
                </span>
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button
              type="submit"
              onClick={HandleSendPost}
              className="ShereButton"
            >
              {Shareloading ? "Shearing" : "Share"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
