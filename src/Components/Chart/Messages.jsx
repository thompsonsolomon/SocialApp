import { useContext, useEffect, useState } from "react/cjs/react.development";
import { db } from "../../firebase";
import { Communication } from "../Context/Communication";
import { doc, onSnapshot } from "firebase/firestore";
import ChatMessage from "./ChartComponent/ChatMessage";
import { AuthContext } from "../Context/AuthContext";
import VoiceNote from "./VoiceNote";

export default function Messages() {
  const { data } = useContext(Communication);
  const [Message, setChatMessage] = useState([]);
  const [Welcome, setWelcome] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setChatMessage(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    if (Message.length > 0) {
      setWelcome(false);
    } else {
      setWelcome(true);
    }
  }, [Message]);



  return (
    <div className="Messages">
      {Welcome ? (
        <div className="Welcome">
          Welcome {currentUser.displayName} <br /> pick a chat there <br />{" "}
          <span className="Welcomeicon">👈</span> <br />
          and continue your conversation here <br />{" "}
          <span className="Welcomeicon">👇</span>
          <h2>Enjoy 👍</h2>
        </div>
      ) : (
        <div>
          {/* <VoiceNote /> */}
          {Message.map((m) => (

              <ChatMessage Message={m} key={m.id} />
            ))}
          
        </div>
      )}
    </div>
  );
}
