import axios from "axios";
import { API_URL } from "@/config/api";

export const newPedido = async (requestBody, cantidad) => {
    try {
        let pedidos = []; 
        
        for (let i = 0; i < cantidad; i++) {
            const response = await axios.post(`${API_URL}/api/pedidos/new`, requestBody);
            pedidos.push(response.data.pedido);
        }

        return pedidos;
    } catch (error) {
        if (error.response) {
            // Errores de respuesta del servidor
            console.error("Error del servidor:", error.response.data);
            alert(`Error: ${error.response.statusText}`);
        } else if (error.request) {
            // Errores de red
            console.error("Error de red:", error.request);
            alert("No se pudo conectar con el servidor");
        } else {
            // Otros errores
            console.error("Error desconocido:", error.message);
            alert("Ocurrió un error desconocido");
        }
    }
}

export const getFormattedDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const miliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const microseconds = `${miliseconds}000`;

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}`;
}

export const descargarReporte = async () => {
    try {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = fechaActual.getMonth() + 1;

        const response = await axios.get(`${API_URL}/api/pedidos/reporte/mensual`, {
            params: { year, month },
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte_pedidos.xlsx");
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error al descargar el reporte:", error);
    }
};
