import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import CustomAlert from "../Constant/CustomAlert";
import { db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function NewReel() {
  const [ReelText, setReelText] = useState("");
  const [ReelImg, setReelImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [Shareloading, setShareLoading] = useState(false);
  const [error, setError] = useState("");
  const userName = currentUser.displayName;
  const Disname = userName.split(" ")[1];
  function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }

  const HandleSendPost = async (e) => {
    e.preventDefault();
    setShareLoading(true);
    const PostId = currentUser.uid;
    console.log(ReelImg);
    const photoURL = currentUser.photoURL;
    try {
      const storageRef = ref(storage, PostId);

      const uploadPostImage = uploadBytesResumable(storageRef, ReelImg);

      uploadPostImage.on(
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadPostImage.snapshot.ref).then(
            async (downloadURL) => {
              const PostRef = collection(db, "Addpost");
              await addDoc(PostRef, {
                id: getUUID(),
                photoURL,
                desc: ReelText,
                src: downloadURL,
                displayName: Disname,
                userId: currentUser.uid,
                shere: [],
                // likes: "500k",
                likes: [],
                // comment: 30,
                comments: [],
                createdAt: new Date().getTime(),
              })
                .then(() => {
                  CustomAlert("success", "Post Added");
                })
                .catch((err) => {
                  setError(err.message);
                  CustomAlert("error", " error while adding post");
                  ReelText("");
                  ReelImg(null);
                  setShareLoading(false);
                });
            }
          );
        }
      );
    } catch (err) {
      console.log("error");
    }
  };
  return (
    <div className="share">
      <form action="/" method="post">
        <div className="shareWrapper">
          <div className="shareTop">
            {/* <VoiceNote /> */}
            {error && <div>{error.message}</div>}
            <div className="inputCon">
              <input
                type="text"
                value={ReelText}
                onChange={(e) => setReelText(e.target.value)}
                placeholder={`Upload a reel${Disname}`}
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
                  onChange={(e) => setReelImg(e.target.files[0])}
                />
                <label htmlFor="file">
                  <span className="shareIcon" style={{ color: "tomato" }}>
                    <i className="bi bi-camera-fill"></i>
                  </span>
                </label>
              </div>
            </div>
            <button type="submit" className="ShereButton">
              {Shareloading ? "Uploading" : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewReel;
