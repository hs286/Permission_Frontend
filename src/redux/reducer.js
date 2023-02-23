import * as types from "./actionType";

const initialState = {
  users: [],
  registereduser: [],
  blogs:[],
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
    case types.ADD_NEW_BLOG:
      return{
        ...state,
        users:action.payload,
      }
      case types.GET_NEW_BLOG:
        return{
          ...state,
          blogs:action.payload.newBlog,
          totalBlogs:action.payload.total,
        }
        case types.IS_GET_PERMISSION:
        return{
          ...state,
          permissions:action.payload.data,
        }
        
    default:
      return state;
  }
};
export default userReducers;
