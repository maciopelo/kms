import { ACTIONS } from "../constants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN.TRY:
      return {
        ...state,
        loading: true,
      };

    case ACTIONS.LOGIN.SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isLogged: true,
        user: { ...action.payload },
      };

    case ACTIONS.LOGIN.ERROR:
      return {
        ...state,
        loading: false,
        isLogged: null,
        user: null,
        error: action.payload,
      };

    case ACTIONS.REGISTER.TRY:
      return {
        ...state,
        loading: true,
      };

    case ACTIONS.REGISTER.SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case ACTIONS.REGISTER.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTIONS.AUTH.SUCCESS:
      return {
        error: false,
        loading: false,
        isLogged: true,
        user: { ...action.payload },
      };

    case ACTIONS.AUTH.ERROR:
      return {
        error: false,
        loading: false,
        isLogged: false,
        user: null,
      };

    case ACTIONS.LOGOUT:
      return {
        error: false,
        loading: false,
        isLogged: null,
        user: null,
      };

    default:
      return state;
  }
};
