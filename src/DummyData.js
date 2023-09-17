import Image__1 from "./Components/img/becca.jpg";
import Image__2 from "./Components/img/boss.jpg";
import Image__3 from "./Components/img/happy.jpg";
import Image__4 from "./Components/img/user.JPG";
import Image__5 from "./Components/img/titan.jpg";
import Add__1 from "./Components/img/about/a1.png";
import Add__2 from "./Components/img/about/a2.jpg";
import Add__3 from "./Components/img/about/a3.png";
import Add__4 from "./Components/img/about/a4.png";
import Add__5 from "./Components/img/about/a5.jpg";
import Add__6 from "./Components/img/about/a6.jpg";
import video1 from "./Components/img/videos/vid1.mp4";
import video2 from "./Components/img/videos/vid2.mp4";
import video3 from "./Components/img/videos/vid3.mp4";

function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const piece = (Math.random() * 16) | 0;
    const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
    return elem.toString(16);
  });
}

export const Users = [
  {
    id: 1,
    profilePicture: Image__1,
    userName: "John Samuel",
  },

  {
    id: 2,
    profilePicture: Image__2,
    userName: "Micheal Grace",
  },

  {
    id: 3,
    profilePicture: Image__3,
    userName: "Prospe Alpha",
  },

  {
    id: 4,
    profilePicture: Image__4,
    userName: "Rey Thompson",
  },
  {
    id: 5,
    profilePicture: Image__5,
    userName: "Joseph ",
  },
];

export const UserStatus = [
  {
    id: 1,
    profilePicture: Image__1,
    userName: "Victorial Jane",
    date: "Yesterday, 5:47 AM",
    statusAmount: "dashed",
  },

  {
    id: 2,
    profilePicture: Image__2,
    userName: "Joseph ",
    date: "Yesterday, 5:47 AM",
    statusAmount: "dotted",
  },
  {
    id: 3,
    profilePicture: Image__3,
    userName: "Thompson Solomon",
    date: "Yesterday, 5:47 AM",
    statusAmount: "solid",
  },
  {
    id: 4,
    profilePicture: Image__4,
    userName: "Olive Celestina",
    date: "Yesterday, 5:47 AM",
    statusAmount: "dotted",
  },
  {
    id: 5,
    profilePicture: Image__5,
    userName: "Reginal Judith",
    date: "Yesterday, 5:47 AM",
    statusAmount: "dotted",
  },
];

export const Friends = [
  {
    id: 1,
    profilePicture: Image__1,
    userName: "Victorial Jane",
  },
  {
    id: 2,
    profilePicture: Image__2,
    userName: "Joseph ",
  },
  {
    id: 3,
    profilePicture: Image__3,
    userName: "Thompson Solomon",
  },
  {
    id: 4,
    profilePicture: Image__4,
    userName: "Olive Celestina",
  },
  {
    id: 5,
    profilePicture: Image__5,
    userName: "Reginal Judith",
  },
];

export const Add = [
  {
    id: 1,
    AddImg: Add__1,
    userName: "Victorial Jane Posted an Add",
  },
  {
    id: 2,
    AddImg: Add__2,
    userName: "Joseph Posted an Add ",
  },
  {
    id: 3,
    AddImg: Add__3,
    userName: "Thompson Solomon Posted an Add",
  },
  {
    id: 4,
    AddImg: Add__4,
    userName: "Olive Celestina Posted an Add",
  },
  {
    id: 5,
    AddImg: Add__5,
    userName: "Reginal Judith Posted an Add",
  },
  {
    id: 6,
    AddImg: Add__6,
    userName: "Reginal Judith Posted an Add",
  },
];

export const Follow = [
  {
    id: 1,
    profilePicture: "/assets/img/people/boss.jpg",
    userName: "Victorial Jane",
  },
  {
    id: 2,
    profilePicture: "/assets/img/people/happy.jpg",
    userName: "Joseph ",
  },
  {
    id: 3,
    profilePicture: "/assets/img/people/image.jpg",
    userName: "Thompson Solomon",
  },
  {
    id: 4,
    profilePicture: "/assets/img/people/oyin.jpg",
    userName: "Olive Celestina",
  },
  {
    id: 5,
    profilePicture: "/assets/img/people/oyinkan.png",
    userName: "Reginal Judith",
  },
];

export const DummyComments = [
  {
    commentId: getUUID(),
    user: 5,
    comment: "Love For All 💛❤💟 , Hatred For None 🌑 ",
    Photo: "/assets/img/people/oyinkan.png",
    userName: "thompson solomon",
    createdAt: new Date().getTime(),
  },

  // userName: currentUser.displayName,
  // comment: commentText,
  // Photo: currentUser.photoUrl,
  // createdAt: new Date().getTime(),
  // commentId: getUUID(),
  {
    commentId: getUUID(),
    user: 1,
    comment:
      "An exploration of big cat breeding and its bizarre underworld, populated by eccentric characters.Louis Bloom, a petty thief, realises that he can make money by capturing photographs of criminal activities and starts resorting to extreme tactics to get them.",
    Photo: "/assets/img/blog/b17.jpg",
    userName: "thompson solomon",
    createdAt: new Date().getTime(),
  },
  {
    commentId: getUUID(),
    user: 2,
    comment: "Love For All 💛❤💟 , Hatred For None 🌑 ",
    Photo: "/assets/img/blog/b17.jpg",
    userName: "thompson solomon",
    createdAt: new Date().getTime(),
  },
  {
    commentId: getUUID(),
    comment:
      "The Abbott family must now face the terrors of the outscommentIde getUUID()orld as they fight for survival in silence. Forced to venture into the unknown, they realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path.",
    user: 3,
    Photo: "/assets/img/blog/b17.jpg",
    userName: "thompson solomon",
    createdAt: new Date().getTime(),
  },
  {
    commentId: getUUID(),
    comment: "Love For All 💛❤💟 , Hatred For None 🌑 ",
    user: 4,
    Photo: "/assets/img/blog/b17.jpg",
    userName: "thompson solomon",
    createdAt: new Date().getTime(),
  },
];

export const Likes = [
  123456789,
  getUUID(),
  getUUID(),
  getUUID(),
  getUUID(),
  getUUID(),
];
export const ReelDb = [
  {
    id: getUUID(),
    likes: "500k",
    src: video1,
    comment: 30,
    shere: 20,
    createdAt: new Date().getTime(),
    desc: "i dont like skinny girls ",
    photoURL: "/assets/img/blog/b17.jpg",
  },
  {
    id: getUUID(),
    likes: "15M",
    src: video2,
    comment: 300 + "k",
    shere: 200,
    createdAt: new Date().getTime(),
    desc: "a silhouetted mutherfucker",
    photoURL: "/assets/img/blog/b17.jpg",
  },
  {
    id: getUUID(),
    likes: "7k",
    src: video3,
    comment: 305,
    createdAt: new Date().getTime(),
    shere: 250 + "k",
    desc: "a boogie with that hoodie",
    photoURL: "/assets/img/blog/b17.jpg",
  },
];
export const profileDatas = [
  {
    uid: getUUID(),
    City: "Akure",
    Bio: "There is nothing to say about me ",
    From: "Osun",
    Relationship: "Single",
    coverUrl: "",
    phoneNumber: "08141342103",
  },
];
