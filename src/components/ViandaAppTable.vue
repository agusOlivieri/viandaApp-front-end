<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import NuevoBtn from '@/components/NuevoBtn.vue';
import EditBtn from '@/components/EditBtn.vue';
import DeleteBtn from '@/components/DeleteBtn.vue';
import EditViandaModal from '@/components/EditViandaModal.vue';
import { useUsuarioStore } from "@/stores/usuario";

const props = defineProps({
    endpoint: {
        type: String,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    queryParams: {
        type: Object,
        default: () => ({}),
    },
    acciones: {
        type: Boolean,
    }
})

const { endpoint, columns, queryParams, acciones } = props;

const data = ref([]);
const loading = ref(false);
const error = ref(null);

const modalOpen = ref(false);
const selectedVianda = ref(null);

const fetchData = async () => {
    const usuarioStore = useUsuarioStore();
    loading.value = true;
    error.value = null;

    try {
        // const token = localStorage.getItem("access_token")
        const distribuidora = usuarioStore.getDistribuidora();
        const response = await axios.get(endpoint + `/${distribuidora}`, {
            params: queryParams,
            // headers: { Authorization: `Bearer ${token}` } 
        });
        data.value = response.data;
    } catch (err) {
        error.value = "Error al cargar los datos: " + err.message;
    } finally {
        loading.value = false;
    };
};

const editVianda = (vianda) => {
    selectedVianda.value = { ...vianda };
    modalOpen.value = true;
};

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
            modalOpen.value = false;
            fetchData();
        } else {
            console.error("Error al actualizar la vianda");
        }

    } catch (error) {
        console.error("Error al intentar actualizar la vianda", error.message);
    };
};

const deleteVianda = async (id) => {
    try {
        const endpoint = `http://localhost:8080/api/viandas/${id}`;
        const response = await axios.delete(endpoint);
        
        if (response.status === 200) {
            fetchData();
        } else {
            console.error("Error al eliminar la vianda");
        }
    } catch (error) {
        console.error("Error al intentar eliminar la vianda:", error.message)
    }
} 


onMounted(fetchData);
watch(() => queryParams, fetchData, { deep: true })

</script>

<template>
    <div class="w-full mt-10">
        <table class="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th v-for="column in columns" :key="column" class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                        {{ column }}
                    </th>
                    <th v-if="acciones" class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id" class="hover:bg-gray-50">
                    <td v-for="column in columns" :key="column" class="border border-gray-300 px-4 py-2 text-gray-600">
                        {{ row[column] }}
                    </td>
                    <td v-if="acciones" class="border border-gray-300 px-4 py-2 flex gap-2">
                        <EditBtn @edit="editVianda(row)" />
                        <DeleteBtn @delete="deleteVianda(row.id)"/>
                    </td>
                </tr>
            </tbody>
        </table>

        <EditViandaModal 
            :isOpen="modalOpen"
            :vianda="selectedVianda"
            @close="modalOpen = false"
            @update="updateVianda"
        />

        <div class="w-32 mt-2">
            <NuevoBtn link="/admin/viandas/new" text="Nuevo"/>
        </div>

        <div v-if="loading" class="text-center text-gray-500 mt-4">Cargando...</div>
        <div v-if="error" class="text-center text-gray-500 mt-4">{{ error }}</div>
    </div>
</template>