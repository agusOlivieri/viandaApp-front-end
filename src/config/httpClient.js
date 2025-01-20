import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "@/services/authService";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
});

apiClient.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("access_token");

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime + 60) {
            token = await refreshAccessToken();
        }

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default apiClient;