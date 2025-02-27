import axios from "axios";

export const newPedido = async (requestBody) => {
    try {
        // const token = localStorage.getItem("access_token")
        // console.log("token: ", token)
        console.log(requestBody)
        const response = await axios.post("https://viandaapp-production.up.railway.app/api/pedidos/new", requestBody)
        // { headers: { Authorization: `Bearer ${token}` } });

        console.log(response.data)
        const pedido = response.data.pedido;
        

        return pedido;
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
        const response = await axios.get("https://viandaapp-production.up.railway.app/api/pedidos/reporte/mensual", {
            params: { year: 2025, month: 2 },
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
