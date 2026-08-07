import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_DEPLOY;

const api = axios.create({
    baseURL: {API_URL},
});

let refreshTokenFunction = null;
let getTokenFunction = null;

export const injectAuthFunctions = (getFn, refreshFn) => {
    getTokenFunction = getFn;
    refreshTokenFunction = refreshFn;
};

api.interceptors.request.use(
    (config) => {
        if (getTokenFunction) {
            const token = getTokenFunction();
            if (token?.accessToken) {
                config.headers["Authorization"] = `Bearer ${token.accessToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshTokenFunction) {
        try {
          const nuevoAccessToken = await refreshTokenFunction();

          if (nuevoAccessToken) {
            originalRequest.headers["Authorization"] = `Bearer ${nuevoAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error al refrescar el token en el interceptor", refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;