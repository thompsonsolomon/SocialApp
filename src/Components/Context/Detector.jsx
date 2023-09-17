import React, { useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "./AuthContext";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { ref } from "firebase/storage";

export default function Detector() {
  const { currentUser } = useContext(AuthContext);

//   try {
    
      
//      updateDoc(doc(db, "userChats", currentUser.uid), {
//     [currentUser.uid + ".userInfo"]: {
//         uid: currentUser.uid,
     
//     },
//     [currentUser.uid + ".date"]: serverTimestamp(),
// });
  
  

// } catch (error) {
  
// }

useEffect(() => {
  const useID = currentUser.uid

  const refrence = database().ref(`/online/${useID}`)

  refrence

  return () => {
    second
  }
}, [third])

return <div>Detector</div>;
}
