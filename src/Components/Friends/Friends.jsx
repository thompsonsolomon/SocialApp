import React, { useContext, useEffect, useState } from "react";
import "./Friends.css";
import { Communication } from "../Context/Communication";
import Topbar from "../Topbar/Topbar";
import { db } from "../../firebase";
import {
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";

export default function Friends() {
  const { data } = useContext(Communication);
  const [Friends, setFriends] = useState([]);
  // const [test, setTest] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleAddFriend = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        history.push("/charts");


        Swal.bindClickHandler();
        Swal.mixin({
          toast: true,
          title:" New Friend Added"
        }).bindClickHandler("data-swal-toast-template");
      }
    } catch (err) {
      setError(err.messages);
      Swal.bindClickHandler();
      Swal.mixin({
        toast: true,
        title:err.message,
        icon: 'error',
      }).bindClickHandler("data-swal-toast-template");
    }

    setUser(null);
  };

  // useEffect(() => {
  //   const unSub = onSnapshot(
  //     doc(db, "users", "16uO39Z0bAenuFmT7L0T8YhWcoT2"),
  //     (doc) => {
  //       doc.exists() && setTest(doc.data().messages);
  //     }
  //   );
  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  useEffect(() => {
    const getChatfriends = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setFriends(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChatfriends();
  }, [currentUser.uid]);

  // console.log(Friends);
  return (
    <div>
      <Topbar />
      <div className="friendsContainer">
        {error && <div>{error.message}</div>}

        {Friends && Object.entries(Friends)?.map((u) => (
          <li className="sidebarfriend" key={u.uid}>
            <img src={u.photoURL} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{u.displayName}</span>
            <button className="sidebarButton" onClick={handleAddFriend}>
              Add Friend
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
