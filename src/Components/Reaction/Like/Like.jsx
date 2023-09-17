 import React, { useContext } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../../firebase";
import { useStateValue } from "../../Context/CommentStateProvider";
import CustomAlert from "../../Constant/CustomAlert";

export default function Like({ likes }) {
  const { currentUser } = useContext(AuthContext);
  const [{ LikeID }] = useStateValue();
  const id  = LikeID && LikeID
// console.log(likes)
  const HandleLike = () => {
    const likesRef = doc(db, "post", id);
    if (likes?.includes(currentUser.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(currentUser.uid),
      })
        .then(() => {
          CustomAlert("error", "Unliked");
        })
        .catch((e) => {
          CustomAlert("error", e.message);
          // console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(currentUser.uid),
      })
        .then(() => {
          CustomAlert("success", "Liked");
        })
        .catch((e) => {
          CustomAlert("error", e.message);
          console.log(e);
        });
    }
  };
  return (
    <div>
      {likes?.includes(currentUser.uid) ? (
        <span className="likeIcon" onClick={HandleLike}>
          💝{""} 
        </span>
      ) : (
        <span className="likeIcon" onClick={HandleLike}>
          👍  
        </span>
      )}
      {/* <i
        className={`fa fa-heart${
          "-o" : ""
        } fa-lg`}
        style={{
          cursor: "pointer",
          color: likes?.includes(currentUser.uid) ? "red" : null,
        }}
        onClick={handleLike}
      /> */}
    </div>
  );
}

// import React, { useState } from 'react'

// function Like() {
//     const [like, setLike] = useState("");
//     const [isliked, setisLiked] = useState(false);

//   const HandleLike = (e) => {
//     e.preventDefault();
//     setLike(isliked ? like - 1 : like + 1);
//     setisLiked(!isliked);
//   };

//   return (
//     <div>
//
//
//           <span className="postlikeCounter">{like} Likes</span>
//         </div>
//   )
// }

// export default Like
