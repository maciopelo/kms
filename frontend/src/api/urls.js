export const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const API = {
  REGISTER: `${BASE_API_URL}/register/`,
  LOGIN: `${BASE_API_URL}/login/`,
  AUTH: `${BASE_API_URL}/auth/`,
  LOGOUT: `${BASE_API_URL}/logout/`,
  USER: {
    TODOS: `${BASE_API_URL}/todo/`,
    CHILDREN: `${BASE_API_URL}/parent/children/`,
  },
  GROUP: `${BASE_API_URL}/group/`,
  ANNOUNCEMENT: `${BASE_API_URL}/announcement/`,
  NEWS: `${BASE_API_URL}/news/`,
  NEWS_FILE: `${BASE_API_URL}/news/file/`,
};
