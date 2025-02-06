<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import NuevoBtn from '@/components/NuevoBtn.vue';

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
    }
})

const { endpoint, columns, queryParams } = props;

const data = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
    loading.value = true;
    error.value = null;

    console.log("endpoint: ", endpoint)

    try {
        // const token = localStorage.getItem("access_token")
        const response = await axios.get(endpoint, {
            params: queryParams,
            // headers: { Authorization: `Bearer ${token}` } 
        });
        data.value = response.data;
    } catch (err) {
        error.value = "Error al cargar los datos: " + err.message;
    } finally {
        loading.value = false;
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id" class="hover:bg-gray-50">
                    <td v-for="column in columns" :key="column" class="border border-gray-300 px-4 py-2 text-gray-600">
                        {{ row[column] }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="w-32 mt-2">
            <NuevoBtn link="/admin/viandas/new" text="Nuevo"/>
        </div>

        <div v-if="loading" class="text-center text-gray-500 mt-4">Cargando...</div>
        <div v-if="error" class="text-center text-gray-500 mt-4">{{ error }}</div>
    </div>
</template>