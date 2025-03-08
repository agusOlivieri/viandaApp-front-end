<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
import RemitoBtn from '@/components/RemitoBtn.vue';
import ReporteBtn from '@/components/ReporteBtn.vue';
import { useUsuarioStore } from "@/stores/usuario";
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import { descargarReporte } from '@/services/pedidoService';
import { API_URL } from '@/config/api';

const props = defineProps({
    endpoint: {
        type: String,
        required: true
    }
})

const usuarioStore = useUsuarioStore();

const distribuidora = usuarioStore.getDistribuidora();

// const distribuidora = 'Placeres';
const data = ref([]);

const fetchData = async () => {
    try {
        // const token = localStorage.getItem("access_token")
        console.log(distribuidora)

        let endpoint;

        if (distribuidora) {
            endpoint = `${API_URL}/api/pedidos/${distribuidora}`
        } else {
            endpoint = `${API_URL}/api/pedidos/today`
        }

        const response = await axios.get(endpoint, {
            // headers: { Authorization: `Bearer ${token}` } 
        });
        data.value = response.data;
        
    } catch (err) {
        console.error("Error al intentar pedir las viandas: ", err)
    };
};

const generarRemito = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/pedidos/remitos/csv`, {
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

    eventSource = new EventSource(`${API_URL}/api/pedidos/stream`);

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
        <div class="mt-16">
            <VolverBtn />
            <div class="w-full px-6">
                <ViandaAppTable :items="data" :acciones="false">
                    <template #header="{ sort, sortKey, sortOrder }">
                        <th @click="sort('usuario.id')" class="py-2 font-medium text-center cursor-pointer">
                            Legajo <span v-if="sortKey === 'usuario.id'">{{ sortOrder === 'asc' ? '🔼' : '🔽' }}</span>
                        </th>
                        <th @click="sort('usuario.nombre')" class="py-2 font-medium text-center cursor-pointer">
                            Nombre Cliente <span v-if="sortKey === 'usuario.nombre'">{{ sortOrder === 'asc' ? '🔼' : '🔽' }}</span>
                        </th>
                        <th v-if="!distribuidora" @click="sort('vianda.distribuidora.nombre')" class="py-2 font-medium text-center cursor-pointer">
                            Distribuidora <span v-if="sortKey === 'vianda.distribuidora.nombre'">{{ sortOrder === 'asc' ? '🔼' : '🔽' }}</span>
                        </th>
                        <th @click="sort('vianda.nombre')" class="py-2 font-medium text-center cursor-pointer">
                            Vianda <span v-if="sortKey === 'vianda.nombre'">{{ sortOrder === 'asc' ? '🔼' : '🔽' }}</span>
                        </th>
                        <th @click="sort('vianda.precio')" class="py-2 font-medium text-center cursor-pointer">
                            Precio <span v-if="sortKey === 'vianda.precio'">{{ sortOrder === 'asc' ? '🔼' : '🔽' }}</span>
                        </th>
                    </template>
                    <template #body="{ item }">
                        <td class="py-2 text-gray-600">{{ item.usuario.id }}</td>
                        <td class="py-2 text-gray-600">{{ item.usuario.nombre }}</td>
                        <td v-if="!distribuidora">{{ item.vianda.distribuidora.nombre }}</td>
                        <td class="py-2 text-gray-600">{{ item.vianda.nombre }}</td>
                        <td class="py-2 text-gray-600">{{ item.vianda.precio }}</td>
                    </template>
                </ViandaAppTable>
            </div>
            <div>
    
                <RemitoBtn @remito="generarRemito"/>
                <ReporteBtn @reporte="descargarReporte"/>
            </div>
        </div>
    </section>
</template>