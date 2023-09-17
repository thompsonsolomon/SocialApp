import React, { useState, useEffect } from "react";
// import { FcNightLandscape,FcLandscape } from "react-icons/fc";

export default function Theme() {
  const [darkMode, setDarkMode] = useState(true);
  const ActiveMode = async () => {
    document.body.classList.add("dark__mode");

    setDarkMode(!darkMode);
    if (darkMode === true) {
      document.body.classList.add("light__mode");
      document.body.classList.remove("dark__mode");
      await localStorage.setItem("Theme", "light__mode");
    }
    if (darkMode === false) {
      document.body.classList.add("dark__mode");
      document.body.classList.remove("light__mode");
      await localStorage.setItem("Theme", "dark__mode");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Theme") === "light__mode") {
      document.body.classList.add("light__mode");
    } else if (localStorage.getItem("Theme") === "dark__mode") {
      document.body.classList.add("dark__mode");
      setDarkMode(!darkMode);
    }
    else{ 
      document.body.classList.add("light__mode"); }
  }, []);
  // femisola

  return (
    <>
      <div className="so__sticky ">
        <div className="switch-checkbox">
          {localStorage.getItem("Theme") === "dark__mode" ? (
            <button
              style={{
                border: "none",
                padding: "10px 18px",
                borderRadius: "5px",
                fontWeight: "500",
                cursor: "pointer",
                margin: "30px 3px",
              }}
              onClick={ActiveMode}
            >
              DarkMode
            </button>
          ) : (
            <button
              style={{
                border: "none",
                padding: "10px 18px",
                borderRadius: "5px",
                fontWeight: "500",
                cursor: "pointer",
                margin: "30px 3px",
              }}
              onClick={ActiveMode}
            >
              LightMode
            </button>
          )}
        </div>
      </div>
    </>
  );
}
