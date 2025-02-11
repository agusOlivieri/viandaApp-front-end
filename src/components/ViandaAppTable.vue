<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import NuevoBtn from '@/components/NuevoBtn.vue';
import EditBtn from '@/components/EditBtn.vue';
import DeleteBtn from '@/components/DeleteBtn.vue';


const props = defineProps({
    headers: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    acciones: {
        type: Boolean,
    },
    editVianda: {
        type: Function,
    }
})

const loading = ref(false);
const error = ref(null);

const selectedItem = ref(null);
const modalOpen = ref(false);

const editVianda = (item) => {
    selectedItem.value = item;
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


// watch(() => fetchData, { deep: true })

</script>

<template>
    <div class="w-full mt-10">
        <table class="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead class="bg-gray-100">
                <tr>
                    <slot name="header"></slot>
                    <th v-if="acciones" class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50">
                    <slot name="body" :item="item"></slot>
                    <td v-if="acciones" class="border border-gray-300 px-4 py-2 flex gap-2">
                        <EditBtn @edit="editVianda(item)" />
                        <!-- <DeleteBtn @delete="deleteVianda(item.id)"/> -->
                    </td>
                </tr>

            </tbody>
        </table>

        <slot name="editModal" :selectedItem="selectedItem"></slot>



        <div class="w-32 mt-2">
            <NuevoBtn link="/admin/viandas/new" text="Nuevo"/>
        </div>

        <div v-if="loading" class="text-center text-gray-500 mt-4">Cargando...</div>
        <div v-if="error" class="text-center text-gray-500 mt-4">{{ error }}</div>
    </div>
</template>