const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = {
  REGISTER: `${BASE_URL}/register/`,
  LOGIN: `${BASE_URL}/login/`,
  AUTH: `${BASE_URL}/auth/`,
  LOGOUT: `${BASE_URL}/logout/`,
  USER: {
    TODOS: `${BASE_URL}/todo/`,
  },
};
