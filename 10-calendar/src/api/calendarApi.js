import axios from 'axios';
import { getEnvVariables } from '../helpers';

const {
  VITE_API_URL,
  VITE_EVENTS_POST_ROUTE,
  VITE_EVENTS_GET_ROUTE,
  VITE_EVENTS_DELETE_ROUTE,
  VITE_EVENTS_SCHEMA,
} = getEnvVariables();

const calendarApi = axios.create({ baseURL: VITE_API_URL });

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };
  return config;
});

// Rutas y esquema (con defaults)
export const EVENTS_POST_ROUTE   = VITE_EVENTS_POST_ROUTE   || '/agregarevento';
export const EVENTS_GET_ROUTE    = VITE_EVENTS_GET_ROUTE    || '/agregarevento';
export const EVENTS_DELETE_ROUTE = VITE_EVENTS_DELETE_ROUTE || EVENTS_POST_ROUTE || '/agregarevento';
export const EVENTS_SCHEMA       = (VITE_EVENTS_SCHEMA || 'agregarevento').toLowerCase();

export default calendarApi;
export { calendarApi };
