import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Components/Context/AuthContext";
import { CommunicationProvider } from "./Components/Context/Communication";
import { StateProvider } from "./Components/Context/CommentStateProvider";
import reducer, { initialState } from "./Components/Context/CommentREducer";
// import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";
import { SkeletonTheme } from "react-loading-skeleton";
import { auth } from "./firebase";
const u = auth.currentUser
console.log(u)
console.log("hi")
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CommunicationProvider>
        <StateProvider initialState={initialState} reducer={reducer}>
          <SkeletonTheme baseColor="red" highlightColor="red">
            <App />
            {/* <h1>hi</h1> */}
          </SkeletonTheme>
        </StateProvider>
      </CommunicationProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//  reactWebVitals(console.log)  
serviceWorker.register();
