import React, { useContext, useState } from "react";
import { Backspace } from "@material-ui/icons";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Add from "../../Components/img/add.png";
import "./UpdateProfile.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import CustomAlert from "../Constant/CustomAlert";
import { updateProfile } from "firebase/auth";
function UpdateProfile() {
  const { currentUser } = useContext(AuthContext);
  const [Profile, SetProfile] = useState();
  const [ProfileUrl, SetProfileUrl] = useState();
  const [Cover, SetCover] = useState();
  const [CoverUrl, SetCoverUrl] = useState();
  const [Bio, SetBio] = useState("");
  const [City, SetCity] = useState("");
  const [From, SetFrom] = useState("");
  const [Relationship, SetRelationship] = useState("");
  const [Phone, SetPhone] = useState("");
  const [UserName, SetUserName] = useState(
    currentUser.displayName && currentUser.displayName
  );
  const storageRef = ref(
    storage,
    `${currentUser.displayName + currentUser.Uid}`
  );

  const handleUploadProfile = async () => {
    try {
      if (Profile) {
        const uploadProfileImage = uploadBytesResumable(storageRef, Profile);
        uploadProfileImage.on(
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadProfileImage.snapshot.ref).then(
              async (downloadURL) => {
                SetProfileUrl(downloadURL);
              }
            );
          }
        );
      } else {
        return;
      }
    } catch (error) {
      CustomAlert("error", error.message);
      // console.log(error.message);
    }
  };
  const handleUploadCover = async () => {
    try {
      if (Cover) {
        const uploadProfileImage = uploadBytesResumable(storageRef, Cover);
        uploadProfileImage.on(
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadProfileImage.snapshot.ref).then(
              async (downloadURL) => {
                SetCoverUrl(downloadURL);
              }
            );
          }
        );
      } else {
        return;
      }
    } catch (error) {
      console.log(error.message);
      CustomAlert("error", error.message);
    }
  };

  const HandleUpdateProfile = async (e) => {
    e.preventDefault();
    alert("hi");
    handleUploadProfile();
    handleUploadCover();
    try {
      await updateProfile(currentUser, {
        displayName: UserName,
        photoURL: ProfileUrl,
      });

      await updateDoc(doc(db, "users", currentUser.Uid), {
        uid: currentUser.Uid,
        City: City,
        Bio: Bio,
        From: From,
        Relationship: Relationship,
        displayName: UserName,
        photoURL: ProfileUrl,
        coverUrl: CoverUrl,
        phoneNumber: Phone,
      });
    } catch (err) {
      console.log(err);
      CustomAlert("error", err.message);
    }

    // alert("hello world ");
  };
  return (
    <form className="UpdateProfileCon" action="/" method="post">
      <div className="UpdateProfileWrapper">
        <div className="BackCon">
          <Link to={`/profile/${currentUser.uid}/${currentUser.displayName}`}>
            <Backspace />
          </Link>
        </div>
        <div style={{ marginBottom: "20px" }}>
          Update Profile
          <div className="InputWrapper">
            <input
              required
              style={{ display: "none" }}
              type="file"
              id="ProfileImage"
              name="true"
              onChange={(e) => SetProfile(e.target.value)}
              accept={".png, .jpg, .jpeg"}
            />
            <label htmlFor="ProfileImage">
              <img src={Add} alt="add" />
              <span>Add Profile Image </span>
            </label>

            <input
              required
              style={{ display: "none" }}
              type="file"
              id="CoverImage"
              name="true"
              onChange={(e) => SetCover(e.target.value)}
              accept={".png, .jpg, .jpeg"}
            />
            <label htmlFor="CoverImage">
              <img src={Add} alt="add" />
              <span>Add Cover Image</span>
            </label>

            <input
              type="text"
              onChange={(e) => SetUserName(e.target.value)}
              value={UserName}
              maxLength={30}
              placeholder="UserName"
            />
            <textarea
              name="Bio"
              className="textArea"
              placeholder="User Biography *Not more than 300 char* "
              cols="30"
              onChange={(e) => SetBio(e.target.value)}
              maxLength={300}
              rows="10"
              value={Bio}
            ></textarea>
            {/* <input type="text" placeholder="Bio" /> */}
          </div>
        </div>
        <div>
          Update Other Profile
          <div className="InputWrapper">
            <input
              type="number"
              value={Phone}
              maxLength={30}
              onChange={(e) => SetPhone(e.target.value)}
              placeholder="Phone number"
            />
            <input
              type="text"
              value={City}
              maxLength={30}
              onChange={(e) => SetCity(e.target.value)}
              placeholder="City"
            />
            <input
              type="text"
              value={From}
              maxLength={30}
              onChange={(e) => SetFrom(e.target.value)}
              placeholder="From"
            />
            <input
              type="text"
              maxLength={30}
              value={Relationship}
              onChange={(e) => SetRelationship(e.target.value)}
              placeholder="Relationship"
            />
          </div>
        </div>
        <div className="buttonCOn">
          <button
            className="SubmitButton"
            onClick={(e) => HandleUpdateProfile(e)}
          >
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateProfile;
