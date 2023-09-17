import React, { useContext } from "react";
import Post from "../Posts/Post";
import Share from "../shere/Share";
import "./feed.css";
import { DummyComments, Likes } from "../../DummyData";
import { useEffect, useState } from "react/cjs/react.development";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";

export default function Feed(username) {
  const [PostContent, setpostContent] = useState([]);
  const [Loading, setLoading] = useState(false);
  const route = username.username;
  const { currentUser } = useContext(AuthContext);

  const userName = currentUser.displayName && currentUser.displayName;
  //  username
  const Uname = userName.split(" ")[0];
  // displaName
  const Disname = userName.split(" ")[1];

  useEffect(() => {
    const getPosts = () => {
      setLoading(true);
      const PostRef = collection(db, "Addpost");
      const q = query(PostRef, orderBy("createdAt"));
      const unsub = onSnapshot(q, (snapshot) => {
        setpostContent(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      });
      return () => {
        unsub();
      };
    };
    currentUser && getPosts();
  }, [PostContent]);

  // console.log(PostContent);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!route || route === currentUser.displayName) && <Share />}
        {
          // Loading ? (

          //   <p className="NoPostFound">Loading... </p>
          // ) : 
          
          PostContent.length == 0 ? (
            <Post
              displayName={Disname}
              verified={false}
              userName={Uname}
              text="No post Found !!!"
              imageUrl=""
              avatar={currentUser.photoUrl}
              likes={Likes}
              comment={DummyComments}
              id="qWM"
              createdAt={new Date().getTime()}
              userId="1234567890po76756453rwfscxcvbmki76"
            />
          ) : (
            <div>
              {PostContent &&
                PostContent.map((Allpost) => (
                  <Post
                    key={Allpost.id}
                    displayName={Allpost.displayName}
                    verified={Allpost.verified}
                    userName={Allpost.userName}
                    text={Allpost.text}
                    imageUrl={Allpost.image}
                    avatar={Allpost.avatar}
                    likes={Allpost.likes}
                    comment={Allpost.comments}
                    userId={Allpost.userId}
                    id={Allpost.id}
                    backGround = {Allpost.backGround}
                    createdAt={Allpost.createdAt}
                  />
                ))}
            </div>
          )
        }
      </div>
    </div>
  );
}
