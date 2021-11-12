import { API } from "../../api/urls";
import { ACTIONS } from "../constants";

export const loginUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "admin", password: "admin" }),
  };

  try {
    dispatch({ type: ACTIONS.AUTH.API_CALL });

    let response = await fetch(API.TOKEN.BASE, requestOptions);
    let data = await response.json();

    if (response.status === 200) {
      dispatch({ type: ACTIONS.AUTH.LOGIN_SUCCESS, payload: data });
      localStorage.setItem("authTokens", JSON.stringify(data));
      return data;
    }

    dispatch({
      type: ACTIONS.AUTH.LOGIN_ERROR,
      payload: "Something went wrong",
    });
    return;
  } catch (err) {
    dispatch({ type: ACTIONS.AUTH.LOGIN_ERROR, payload: err });
  }
};
