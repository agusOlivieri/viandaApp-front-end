import axios from "axios";
import { API_URL } from "@/config/api";

export const getTokens = async (endpoint, requestBody) => {
    console.log(requestBody)
    try {
        const response = await axios.post(endpoint, requestBody);
        const { access_token, refresh_token } = response.data; 

        return access_token;

      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Hubo un problema con el registro. Por favor, intente de nuevo.");
      }
}

export const refreshAccessToken = async () => {
    try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) throw new Error("No se encontró el refresh_token");

        const response = await axios.post(`${API_URL}/api/auth/refresh`, { refresh_token });
        const { access_token } = response.data;

        localStorage.setItem("access_token", access_token);
    } catch (error) {
        console.error("Error al renovar el token de acceso:", error);
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
    }
}