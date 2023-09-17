export const initialState = {
    StatusID:null,
  };

  const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
      case "ADD_Status_ID":
        return {
          state,
          StatusID: [state.StatusID, action.id],
        };
      case 'REMOVE_COMMENT_ID':
        return {
          state,
          ComentID:null
        }
      
      case 'REMOVE_LIKE_ID':
        return {
          state,
          LikeId:null
        }
  
  
      default:
        return state;
    }
  };
  
  export default reducer;
  