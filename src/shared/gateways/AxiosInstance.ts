import axios from 'axios';
import {API_BASEURL} from '../../ui/routes/ApiRoutes';
import {useAppSelector} from '../../app/hook';
import {selectToken} from '../../features/auth/thunks/AuthenticationSelectors';
import {RootState, store} from '../../app/store';

const api = axios.create({
  baseURL: API_BASEURL,
  timeout: 10000, // Specify a timeout (in milliseconds) for requests
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

const apiUpload = axios.create({
  baseURL: API_BASEURL,
  timeout: 10000, // Specify a timeout (in milliseconds) for requests
  headers: {
    'Content-Type': 'multipart/form-data',
    // Add any other default headers you need
  },
});
api.interceptors.request.use(
  config => {
    const authToken = selectToken(store.getState());
    if (authToken) {
      console.log('code2374532fs',authToken);
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiUpload.interceptors.request.use(
  config => {
    const authToken = selectToken(store.getState());
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export default api;
