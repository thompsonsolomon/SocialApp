import React from "react";
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react/cjs/react.development";
import { AuthContext } from "../../Context/AuthContext";
import { Communication } from "../../Context/Communication";
import { generateDate } from "../../UI/FormatedDate";
import { Gathering } from "../../UI/Loader";
import { format } from "timeago.js";

export default function ChatMessage({ Message }) {
  const { data } = useContext(Communication);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser.photoURL) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser.photoURL]);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [Message]);

  const formatedDate = generateDate(Message.date.seconds);

  return (
    <>
      <div
        className={`ChatMessage ${
          Message.senderId === currentUser.uid && "owner"
        }`}
      >
        <div className="ChatMessageInfo">
          {loading ? (
            <div className="stage">
              <div className="dot-flashing"></div>
            </div>
          ) : (
            <img
              src={
                Message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt=""
            />
          )}{" "}
          <span>{formatedDate.date}</span>
          <span>{format(Message.date)}</span>
        </div>
        <div className="ChatMessageContent">
          <p>{Message.text}</p>
          {loading ? (
            <Gathering />
          ) : (
            <div>{Message.Img && <img src={Message.Img} alt="" />}</div>
          )}
        </div>
      </div>
    </>
  );
}

// https://codeat21.com/light-and-dark-mode-in-a-react-app-with-localstorage/
// https://www.google.com/search?q=light+mode+and+dark+mode+using+react+and+localstorage&oq=light+mode+and+dark+mode+using+react+and+localstorage&aqs=chrome..69i57.33156j0j7&sourceid=chrome&ie=UTF-8
// https://aleksandarpopovic.com/Easy-Dark-Mode-Switch-with-React-and-localStorage/
