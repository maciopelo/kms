import { ACTIONS } from "../constants";
import jwt_decode from "jwt-decode";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH.API_CALL:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authTokens: action.payload,
        user: jwt_decode(action.payload.access),
      };
    case ACTIONS.AUTH.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
