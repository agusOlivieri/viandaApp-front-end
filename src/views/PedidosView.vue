<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
import RemitoBtn from '@/components/RemitoBtn.vue';
import ReporteBtn from '@/components/ReporteBtn.vue';
import { useUsuarioStore } from "@/stores/usuario";
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import { descargarReporte } from '@/services/pedidoService';

const usuarioStore = useUsuarioStore();

// const distribuidora = usuarioStore.getDistribuidora();
const distribuidora = 'placeres';
const data = ref([]);

const fetchData = async () => {
    try {
        // const token = localStorage.getItem("access_token")
        const response = await axios.get(`https://viandaapp-production.up.railway.app/api/pedidos/${distribuidora}`, {
            // headers: { Authorization: `Bearer ${token}` } 
        });
        data.value = response.data;
        
    } catch (err) {
        console.error("Error al intentar pedir las viandas: ", err)
    };
};

const generarRemito = async () => {
    try {
        const response = await axios.get("https://viandaapp-production.up.railway.app/api/pedidos/remitos/csv", {
            responseType: "blob",
            params: { distribuidora: distribuidora }
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Remito_Pedidos.csv")
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error al generar el remito: ", error);
    }
}

let eventSource;

onMounted(() => {
    fetchData();

    eventSource = new EventSource("https://viandaapp-production.up.railway.app/api/pedidos/stream");

    eventSource.onmessage = (event) => {
        const nuevoPedido = JSON.parse(event.data);
        data.value.push(nuevoPedido);
    };

    eventSource.onerror = () => {
        console.error("Error en SSE, cerrando conexión");
        eventSource.close();
    };
});

onUnmounted(() => {
    if (eventSource) {
        eventSource.close();
    }
})
</script>

<template>
    <section id="viandas">
        <VolverBtn />
        <div class="w-full px-6">
            <ViandaAppTable :items="data" :acciones="false">
                <template #header>
                    <th class="py-2 font-medium text-center">Legajo</th>
                    <th class="py-2 font-medium text-center">Nombre Cliente</th>
                    <th class="py-2 font-medium text-center">Vianda</th>
                    <th class="py-2 font-medium text-center">Precio</th>
                </template>
                <template #body="{ item }">
                    <td class="py-2 text-gray-600">{{ item.usuario.id }}</td>
                    <td class="py-2 text-gray-600">{{ item.usuario.nombre }}</td>
                    <td class="py-2 text-gray-600">{{ item.vianda.nombre }}</td>
                    <td class="py-2 text-gray-600">{{ item.vianda.precio }}</td>
                </template>
            </ViandaAppTable>
        </div>
        <div>

            <RemitoBtn @remito="generarRemito"/>
            <ReporteBtn @reporte="descargarReporte"/>
        </div>
    </section>
</template>