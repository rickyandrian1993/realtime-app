import axios from "axios";
import RefreshToken from "./RefreshToken";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orginalRequest = error.config;

    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      try {
        await RefreshToken();

        // Update access token di originalRequest
        orginalRequest.headers["Authorization"] = `Bearer ${secureLocalStorage.getItem("accessToken")}`;

        // Retry request yang sebelumnya error
        return api(orginalRequest);
      } catch (error) {
        // Error handling
        console.error("Error refreshing token: ", error);
        throw error;
      }
    }
    throw error;
  }
);

export default api;
