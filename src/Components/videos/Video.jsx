import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import "./Video.css";
import DummyImg from "../img/placeholder.png";
import { ReelDb } from "../../DummyData";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { format } from "timeago.js";
import NewReel from "./NewReel";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

let vid = document.querySelectorAll("video");
let play_circle = document.querySelectorAll("#play");

let vid_info = document.querySelectorAll(".video_info");
let info_plus = document.querySelectorAll("#int");
let closebtn = document.querySelectorAll("#close");

let spinner = document.querySelectorAll(".spinner");
play_circle.forEach((circle, i) => {
  console.log(vid[i].duration);
  let toggle_play = () => {
    if (vid[i].paused === true) {
      vid[i].play();

      circle.innerHTML = `<i className="bi bi-pause"></i>`;
    } else {
      vid[i].pause();

      circle.innerHTML = `<i className="bi bi-play"></i>`;
    }

    setTimeout(clickToPlay, 300);
  };
  let clickToPlay = () => {
    if (vid[i].paused === true) {
      circle.classList.add("active");
    } else if (vid[i].paused === false) {
      circle.classList.remove("active");
    }
  };

  vid[i].addEventListener("click", () => {
    toggle_play();
    if (vid[i].paused === false) {
      spinner[i].classList.add("active");
    } else if (vid[i].paused === true) {
      spinner[i].classList.remove("active");
    }
  });

  closebtn[i].addEventListener("click", () => {
    vid_info[i].classList.remove("active");
  });
  info_plus[i].addEventListener("click", () => {
    vid_info[i].classList.add("active");
  });
});

// let observe = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
// //     console.log(entry);
// //     if (entry.isIntersecting === true) {
// //     } else {
// //     }
//   });
// });
// console.log(ReelDb.src);
export default function Video() {
  const { currentUser } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  useEffect(() => {
    const getVideo = () => {
      const PostRef = collection(db, "Addpost");
      const q = query(PostRef, orderBy("createdAt"));
      const unsub = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))) {
          setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } else {
          setData(ReelDb);
        }
      });
      return () => {
        unsub();
      };
    };
    currentUser && getVideo();
  }, [Data]);
  console.log(Data)

  return (
    <div className="videos">
      {/* <Topbar /> */}
      <div className="videoCon">
        {/* <Sidebar /> */}
        <div className="diveoWrapper">
          <div>
            <div className="wrapper">
              <div className="reel_top">
                <span id="lg">Vidmax</span>
                <span id="search">
                  {" "}
                  <i className="bi bi-search SearchIcon"></i>{" "}
                </span>
              </div>
              <Link id="backarrow" to="/">
                {/* <i className="fa-solid fa-arrow-left  SearchIcon"></i> */}
                <i className="bi bi-arrow-left-short  SearchIcon"></i>
              </Link>

              {Data &&
                Data.map((ReelData) => (
                  <div className="reel_card" key={ReelData.id}>
                    <div className="video_info">
                      <span id="close">
                        {" "}
                        {/* <i className="fa-solid fa-close"></i> */}
                        <i className="bi bi-x"></i>
                      </span>

                      <div className="info">
                        <span id="vid_info_head">Video information</span>
                        {/* <span id="">
                          Length:<b>2min 30s</b>
                        </span> */}
                        <span id="">
                          Uploader:<b>Admin</b>
                        </span>
                        <span id="">Upload time: </span>
                      </div>
                      <div className="NewReel">
                        {/* <span id="upload">
                          Upload a reel
                          <span id="btn">
                            <i className="bi bi-plus"></i>
                          </span>
                          <i className="bi bi-plus"></i>
                        </span> */}
                        <NewReel />
                      </div>

                      <span id="copy">All rights reserved © 2022</span>
                    </div>

                    <video src={ReelData.src}></video>

                    <span id="play" style={{ color: "white" }}>
                      {/* <i className="fa-solid fa-play"></i> */}
                      <i className="bi bi-play"></i>
                    </span>

                    <div className="right_function">
                      <span id="">
                        {ReelData.likes}
                        {/* <i className="fa-solid fa-heart"></i> */}
                        <i className="bi bi-heart-fill"></i>
                        {/* <i className="bi bi-heart"></i> */}
                      </span>
                      <span id="">
                        {ReelData.comment}
                        {/* <i className="fa-solid fa-comment "></i> */}
                        <i className="bi bi-chat-square-text-fill"></i>
                      </span>
                      <span id="">
                        {ReelData.shere}
                        {/* <i className="fa-solid fa-share"></i> */}
                        <i className="bi bi-send-check-fill"></i>
                      </span>
                      <span>
                        <b>{format(ReelData.createdAt)}</b>
                      </span>

                      <span id="int">
                        {/* <i className="fa-solid fa-plus"></i> */}
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>

                    <div className="bottom_function">
                      <div className="sec">
                        <marquee>{ReelData.desc}</marquee>
                        <img
                          className="spinner "
                          src={ReelData.photoURL ? ReelData.photoURL : DummyImg}
                          alt="spinimg"
                        />
                        {/* <span ></span>{" "} */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
