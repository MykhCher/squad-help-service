import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';

const instance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => {
    if (response.data.token) {
      window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, response.data.token);
    }
    return response;
  },
  async err => {
    const originalRequest = err.config;
    
    if (
      err.response.status === 408 &&
      err.config &&
      !err.config._isRetry &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await instance.get(`${CONSTANTS.BASE_URL}refresh`, { withCredentials: true });
        localStorage.setItem(CONSTANTS.ACCESS_TOKEN, response.data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        history.replace('/login');
        return Promise.reject(err);
      }
    }
    throw err;
  }
);

export default instance;
