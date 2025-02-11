<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
import EditViandaModal from '@/components/EditViandaModal.vue';
import { useUsuarioStore } from "@/stores/usuario";
import { ref, onMounted } from 'vue';
import axios from 'axios';

const usuarioStore = useUsuarioStore();

const selectedItem = ref(null);

const updateVianda = async (updatedVianda) => {
    try {
        // const token = localStorage.getItem("access_token")
        const endpoint = "http://localhost:8080/api/viandas/update";
        const response = await axios.put(
            endpoint, 
            updatedVianda
            //  { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.status === 200) {
            closeModal();
            fetchData();
        } else {
            console.error("Error al actualizar la vianda");
        }

    } catch (error) {
        console.error("Error al intentar actualizar la vianda", error.message);
    };
};

// const distribuidora = usuarioStore.getDistribuidora();
const distribuidora = 'placeres';
const data = ref([]);

const fetchData = async () => {
    try {
        // const token = localStorage.getItem("access_token")
        const response = await axios.get(`http://localhost:8080/api/viandas/${distribuidora}`, {
            // headers: { Authorization: `Bearer ${token}` } 
        });
        data.value = response.data;
    } catch (err) {
        console.error("Error al intentar pedir las viandas: ", err)
    };
};

onMounted(fetchData);

const closeModal = () => {
    selectedItem.value = null
}
</script>

<template>
    <section id="viandas">
        <div class="w-full ">
            <ViandaAppTable :items="data" :acciones="true" :editVianda="editVianda">
                <template #header>
                    <th class="border border-gray-300 px-4 py-2 text-left font-medium text-center">Nombre</th>
                    <th class="border border-gray-300 px-4 py-2 text-left font-medium text-center">Descripción</th>
                    <th class="border border-gray-300 px-4 py-2 text-left font-medium text-center">Precio</th>
                </template>
                <template #body="{ item }">
                    <td class="border border-gray-300 px-4 py-2 text-gray-600">{{ item.nombre }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-gray-600">{{ item.descripcion }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-gray-600">{{ item.precio }}</td>
                </template>
                <template #editModal="{ selectedItem }">
                    <EditViandaModal v-if="selectedItem" :vianda="selectedItem" @close="closeModal" @update="updateVianda" />
                </template>
            </ViandaAppTable> 
        </div>
        <div>
            <VolverBtn />
        </div>
    </section>
</template>