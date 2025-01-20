import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getTokens = async (endpoint, requestBody) => {
    try {
        const response = await axios.post(endpoint, requestBody);
        const { access_token, refresh_token } = response.data; 
    
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        alert("Registro exitoso");
        return access_token;

      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Hubo un problema con el registro. Por favor, intente de nuevo.");
      }
}