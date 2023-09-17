import React from "react";
import { useContext } from "react/cjs/react.development";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Communication } from "../../Context/Communication";
import AttachIMG from "../../img/attach.png";
import Image from "../../img/img.png";
import Send from "../../img/Send.png";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import Swal from "sweetalert2";
import CustomAlert from "../../Constant/CustomAlert";

export default function ChatInput() {
  const [Img, setImg] = useState(null);
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(Communication);

  function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }

  // const handleSendkey = (e) => {
  //   console.log(e.code);
  //   e.code === "ShiftLeft" && handleSend();
  //   e.code === "ShiftRight" && handleSend();
  // };

  const handleSend = async () => {
    if (Img) {
      const storageRef = ref(storage, getUUID());

      const uploadTask = uploadBytesResumable(storageRef, Img);

      uploadTask.on(
        (error) => {
          CustomAlert("error", error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: getUUID(),
                text,
                senderId: currentUser.uid,
                date: new Date().getTime(),
                Img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: getUUID(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    }).catch((error) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    });
    setText("");
    setImg(null);
  };

  return (
    <div className="ChatInput">
      <div className="OverFlowImageName">{Img && Img.name}</div>
      <div className="SendInputRight">
        <textarea
          required
          placeholder="Type something..."
          name=""
          id=""
          minLength={6}
          cols="30"
          rows="10"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="send">
        <img src={AttachIMG} alt="" />
        <input
          type="file"
          name=""
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button onClick={handleSend}>
          {" "}
          {Img || text?.length > 1 ? (
            <img className="Sender" src={Send} alt="" />
          ) : (
            "Typing..."
          )}
        </button>
      </div>
    </div>
  );
}
