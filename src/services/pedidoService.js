import axios from "axios";

export const newPedido = async (requestBody) => {
    try {
        const token = localStorage.getItem("access_token")
        console.log("token: ", token)
        const response = await axios.post("http://localhost:8080/api/pedidos/new", requestBody, { headers: { Authorization: `Bearer ${token}` } });

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