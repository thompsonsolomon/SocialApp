import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const Communication = createContext();

export const CommunicationProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_Communication":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };


  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <Communication.Provider value={{ data: state, dispatch }}>
      {children}
    </Communication.Provider>
  );
};
