const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = {
  TOKEN: {
    BASE: `${BASE_URL}/token/`,
    REFRESH: `${BASE_URL}/token/refresh`,
  },
};
