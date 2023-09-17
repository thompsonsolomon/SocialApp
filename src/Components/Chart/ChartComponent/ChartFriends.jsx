import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { Communication } from "../../Context/Communication";

export default function ChartFriends() {
  const [chatfriends, setChatfriends] = useState([]);
  const [viberate, setViberate] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(Communication);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser.photoURL) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser.photoURL]);

  useEffect(() => {
    const getChatfriends = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChatfriends(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChatfriends();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_Communication", payload: u });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "  ....  " : str;
  }

  // useEffect(() =>{

  //   const viberation =  window.navigator.vibrate([300, 100, 300, 100 ]);
  // })

  return (
    <div className="ChatsOPtion">
      {chatfriends &&
        Object.entries(chatfriends)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chatfriend) => (
            <div
              className="userChatFriends"
              key={chatfriend[0]}
              onClick={() => handleSelect(chatfriend[1].userInfo)}
            >
              <div>
                {chatfriend && (
                  <img src={chatfriend[1].userInfo.photoURL} alt="" />
                )}
              </div>{" "}
              <div className="userChatInfo">
                <span>{chatfriend[1].userInfo.displayName}</span>
                <p>
                  {chatfriend[1].lastMessage?.text && truncate(
                    <span> {chatfriend[1].lastMessage?.text}</span>,
                    50
                  )}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}
