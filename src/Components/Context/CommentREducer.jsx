export const initialState = {
    ComentID:null,
    LikeId:null,
    StatusID:null,
  };

  const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
      case "ADD_COMMENT_ID":
        return {
          state,
          ComentID: [state.ComentID, action.id],
        };
      case "ADD_LIKE_ID":
        return {
          state,
          LikeId:[state.LikeId, action.id],
        };
        
      case "ADD_Status_ID":
        return {
          state,
          StatusID:[state.StatusID, action.id],
        };
      
        // Remove Id from reducer
        
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
  
      case 'REMOVE_Status_ID':
        return {
          state,
          StatusID:null
        }
  
  
      default:
        return state;
    }
  };
  
  export default reducer;
  