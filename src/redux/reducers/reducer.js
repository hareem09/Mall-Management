import { LOGIN, LOGOUT, SIGNUP } from "../action/action";

const initialState = {
  isLogin: false,
  isSignup: false,
  user:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        user:action.payload

      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case SIGNUP:
      return {
        ...state,
        isSignup: true,
        user:action.payload
      };
       default:
      return state;
  
  }
};
export default reducer; 