import axios from "axios";

export const handleDescuentos = async () => {
    try {
        const response = await axios.get("https://viandaapp-production.up.railway.app/api/pedidos");
        const pedidos = response.data;

        // console.log("pedidos: ", pedidos)

        const pedidosPorUsuario = new Map();

        pedidos.forEach(pedido => {
            const userId = pedido.usuario.id;
            const fecha = pedido.fecha.split("T")[0];
            const key = `${userId}-${fecha}`;

            if (!pedidosPorUsuario.has(key)) {
                pedidosPorUsuario.set(key, []);
            }
            pedidosPorUsuario.get(key).push(pedido);
        });

        // console.log("pedidos por usuario: ", pedidosPorUsuario)

        const tabla = pedidos.map(pedido => {
            const userId = pedido.usuario.id;
            const fecha = pedido.fecha.split("T")[0];
            const key = `${userId}-${fecha}`;

            const pedidosDelDia = pedidosPorUsuario.get(key);

            const esPrimerPedido = pedidosDelDia[0].id === pedido.id;
            const precioFinal = esPrimerPedido ? pedido.vianda.precio * 0.5 : pedido.vianda.precio;
            
            return {
                Usuario: pedido.usuario.nombre,
                Vianda: pedido.vianda.nombre,
                Precio: `$${precioFinal.toFixed(2)}`,
                Fecha: fecha
            }
        });

        console.table(tabla);
    } catch (error) {
        console.error("Error al intentar obtener los pedidos: ", error.message);
    }
};
