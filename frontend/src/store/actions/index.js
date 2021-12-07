import { API } from "../../api/urls";
import { ACTIONS } from "../constants";
import { getUrlDateFormat } from "../../utils/dateHelpers";

// USER REGISTER
export const registerUser = async (dispatch, registerPayload) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...registerPayload,
    }),
  };

  try {
    dispatch({ type: ACTIONS.REGISTER.TRY });

    let response = await fetch(API.REGISTER, requestOptions);
    let data = await response.json();

    if (response.status === 201) {
      dispatch({ type: ACTIONS.REGISTER.SUCCESS, payload: data });
      return data;
    }

    console.log(data.email);
    const error = {
      username: data.username ? "podany już login jest używany" : "",
      email: data.email ? ", podany email już jest używany" : "",
    };
    dispatch({
      type: ACTIONS.REGISTER.ERROR,
      payload: `${error.username}${error.email}`,
    });

    return;
  } catch (err) {
    dispatch({ type: ACTIONS.REGISTER.ERROR, payload: err });
  }
};

// USER LOGIN
export const loginUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: loginPayload.username,
      password: loginPayload.password,
    }),
  };

  try {
    dispatch({ type: ACTIONS.LOGIN.TRY });

    let response = await fetch(API.LOGIN, requestOptions);
    let data = await response.json();

    if (response.status === 200) {
      dispatch({ type: ACTIONS.LOGIN.SUCCESS, payload: data });
      return data;
    }

    dispatch({
      type: ACTIONS.LOGIN.ERROR,
      payload: data.msg,
    });

    return;
  } catch (err) {
    dispatch({ type: ACTIONS.LOGIN.ERROR, payload: err });
  }
};

// USER AUTH
export const authUser = async (dispatch) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
  };

  try {
    let response = await fetch(API.AUTH, requestOptions);
    let data = await response.json();

    if (response.status === 200) {
      dispatch({ type: ACTIONS.AUTH.SUCCESS, payload: data });
      return;
    }

    dispatch({ type: ACTIONS.AUTH.ERROR, payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: ACTIONS.AUTH.ERROR, payload: false });
  }
};

// USER LOGOUT
export const logoutUser = async (dispatch) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
  };

  try {
    let response = await fetch(API.LOGOUT, requestOptions);

    if (response.status === 200) {
      dispatch({ type: ACTIONS.LOGOUT });
      return;
    }

    console.log(response);

    return;
  } catch (err) {
    console.log(err);
  }
};
