<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
import EditViandaModal from '@/components/EditViandaModal.vue';
import { useUsuarioStore } from "@/stores/usuario";
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import EditBtn from '@/components/EditBtn.vue';
import DeleteBtn from '@/components/DeleteBtn.vue';
import NuevoBtn from '@/components/NuevoBtn.vue';

const usuarioStore = useUsuarioStore();

const selectedItem = ref(null);
const modalOpen = ref(false);

const updateVianda = async (updatedVianda) => {
    try {
        // const token = localStorage.getItem("access_token")
        const endpoint = "https://viandaapp-production.up.railway.app/api/viandas/update";
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

// const distribuidora = usuarioStore.getDistribuidora();
const distribuidora = 'placeres';
const data = ref([]);

const fetchData = async () => {
    try {
        // const token = localStorage.getItem("access_token")
        const response = await axios.get(`https://viandaapp-production.up.railway.app/api/viandas/${distribuidora}`, {
            // headers: { Authorization: `Bearer ${token}` } 
        });
        data.value = response.data;
    } catch (err) {
        console.error("Error al intentar pedir las viandas: ", err)
    };
};

onMounted(fetchData);
watch(() => fetchData, { deep: true })

const editVianda = (item) => {
    selectedItem.value = item;
    modalOpen.value = true;
};

const deleteVianda = async (id) => {
    console.log(id)
    try {
        const endpoint = `https//viandaapp-production.up.railway.app/api/viandas/${id}`;
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
</script>

<template>
    <section id="viandas">
        <VolverBtn />
        <div class="w-full px-6">
            <ViandaAppTable :items="data" :acciones="true">
                <template #header>
                    <th class="py-2 font-medium text-center">Nombre</th>
                    <th class="py-2 font-medium text-center">Descripción</th>
                    <th class="py-2 font-medium text-center">Precio</th>
                </template>
                <template #body="{ item }">
                    <td class="py-2">{{ item.nombre }}</td>
                    <td class="py-2">{{ item.descripcion }}</td>
                    <td class="py-2">{{ item.precio }}</td>
                </template>
                <template #actions="{ item }">
                    <td class="py-2 flex gap-2 justify-center">
                        <EditBtn @edit="editVianda(item)" />
                        <DeleteBtn @delete="deleteVianda(item.id)"/>
                    </td>
                </template>    
            </ViandaAppTable>
        </div>

        <NuevoBtn link="/admin/viandas/new" text="Nuevo"/>
        
        <EditViandaModal 
            :isOpen="modalOpen"
            :vianda="selectedItem"
            @close="modalOpen = false"
            @update="updateVianda"
        />
    </section>
</template>