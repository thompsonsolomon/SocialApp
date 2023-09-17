import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  // const u = auth.currentUser
  // useEffect(() => {
  //   setLoading(false);

  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(null);
  //     // setCurrentUser({
  //     //   displayName: "solomon Thompson",
  //     //   photoURL: "/assets/about/a1.png",
  //     //   uid: 123456789,
  //     // });
  //     // }
  //   });
  //   // https://github.com/thompsonsolomon/SocialApp.git
  //   return () => {
  //     unsub();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)

      // setCurrentUser({
      //   displayName: "solomon Thompson",
      //   photoURL: "",
      //   uid:123456789,
      // });

      setLoading(false);

      console.log(user);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};
