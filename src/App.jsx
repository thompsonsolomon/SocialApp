import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./ROUTES";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "./Components/Context/AuthContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Friends from "./Components/Friends/Friends";
import StatusCon from "./Components/StatusCon/StatusCon";
import ChartFeed from "./Pages/Chart/Chart";
import NotifiCon from "./Pages/Notification/NotifiCon";
import Timeline from "./Pages/Notification/Timeline";
import Video from "./Components/videos/Video";
import Notfound from "./Pages/PageNotFound/Notfound";
import ForgottenPassword from "./Pages/Exteras/ForgottenPassword";
import Theme from "./Components/UI/Theme";
import Setting from "./Components/Setting/Setting";
import NetworkController from "./NetworkController";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import NewReel from "./Components/videos/NewReel";

export default function App() {
  const { currentUser } = useContext(AuthContext);

  const [Preloader, setPreloader] = useState(true);

  setTimeout(() => {
    setPreloader(false);
  }, 4000);

  console.log(currentUser);

  return (
    <div className="App">
      <Router>
        {Preloader && <div id="preloader"></div>}
        <NetworkController />
        <div style={{ display: "none" }}>
          <Theme />
        </div>
        <Switch>
           <ProtectedRoute user={currentUser} path="/videos">
            <Video />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/UploadNewReel">
            <NewReel />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/profile/:id/:userName">
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute user={currentUser} path="/setting">
            <Setting />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/friends">
            <Friends />
          </ProtectedRoute>

          <IsUserRedirect user={currentUser} loggedInPath="/feed" path="/login">
            <Login />
          </IsUserRedirect>

          <IsUserRedirect
            user={currentUser}
            loggedInPath="/feed"
            path="/register"
          >
            <Register />
          </IsUserRedirect>

          <ProtectedRoute user={currentUser} path="/timeline">
            <Timeline />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/StatusCon">
            <StatusCon />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/charts">
            <ChartFeed />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/notification">
            <NotifiCon />{" "}
          </ProtectedRoute>
          <ProtectedRoute user={currentUser} path="/feed">
            <Home />
          </ProtectedRoute>

          <ProtectedRoute user={currentUser} path="/UpdateProfile">
            <UpdateProfile />
          </ProtectedRoute>
          <Route path="/ForgotPassword">
            <ForgottenPassword />
          </Route>

          <ProtectedRoute user={currentUser} path="/" exact>
            <Home />
          </ProtectedRoute>
          <Route exact path="*">
            <Notfound />
          </Route>
          <ProtectedRoute user={currentUser} path="/feed">
            <Home />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>

    // {/* <Home /> */}
    // {/* <Profile  /> */}
    // {/* <Login/> */}
    // {/* </div> */}
  );
}
