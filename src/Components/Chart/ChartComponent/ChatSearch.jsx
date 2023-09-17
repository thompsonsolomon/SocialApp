import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useState, useContext, useEffect } from "react/cjs/react.development";
import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import CustomAlert from "../../Constant/CustomAlert";

export default function ChatSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser.photoURL) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser.photoURL]);

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSearch = async () => {
    const quary = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );


    try {
      const querySnapshot = await getDocs(quary);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      CustomAlert("error", err.message)
    }
  };

  const handleSelect = async () => {
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

      }
    } catch (err) {
      CustomAlert("error", err.message) 
      setUsername("");
    }

    setUser(null);
    setUsername("");
  };
  return (
    <div className="ChatSearch">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user "
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>{error}</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          {loading ? (
            <div className="imagetage">
              <div className="dot-spin"></div>
            </div>
          ) : (
            <img src={user.photoURL} alt="" />
          )}{" "}
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
