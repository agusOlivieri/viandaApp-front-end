<script setup>
import axios from "axios";

defineProps({
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
})

const data = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
    this.loading = true;
    this.error = null;

    try {
        const response = await axios.get(this.enpoint, {
            params: queryParams,
        });
        data.value = response.data;
    } catch (err) {
        error.value = "Error al cargar los datos: " + err.message;
    } finally {
        loading.value = false;
    }
}

watch(() => queryParams, fetchData, { deep: true })

onMounted(fetchData);

</script>

<template>
    <div>
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

        <div v-if="loading" class="text-center text-gray-500 mt-4">Cargando...</div>
        <div v-if="error" class="text-center text-gray-500 mt-4">{{ error }}</div>
    </div>
</template>