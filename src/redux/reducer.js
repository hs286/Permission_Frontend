import * as types from "./actionType";

const initialState = {
  users: [],
  registereduser: [],
  Assignments:[],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGGED_IN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case types.ADD_NEW_USER:
      return {
        ...state,
        users: action.payload,
      };
    case types.ADD_NEW_ASSIGNMENT:
      return{
        ...state,
        users:action.payload,
      }
      case types.GET_ASSIGNMENTS:
        return{
          ...state,
          Assignments:action.payload.newAssignments,
          totalAssignments:action.payload.total,
        }
        case types.GET_PERMISSIONS:
        return{
          ...state,
          permissions:action.payload.data,
        }
        
    default:
      return state;
  }
};
export default userReducers;
