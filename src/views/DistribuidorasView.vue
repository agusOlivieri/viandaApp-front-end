<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const distribuidoras = ref([]);

const fetchDistribuidoras = async () => {
    try {
        const endpoint = "https://viandaapp-production.up.railway.app/api/viandas/distribuidoras";
        const response = await axios.get(endpoint);
        distribuidoras.value = response.data;

    } catch (error) {
        console.error("Hubo un error al pedir las distribuidoras: ", error.message);
    };
};

onMounted(fetchDistribuidoras)

</script>

<template>
    <section id="distribuidoras" class="flex flex-col h-screen w-full py-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-center mt-4">Elija una distribuidora</h1>
        <div class="flex-grow flex flex-col sm:flex-row justify-center items-center gap-5">
            <RouterLink  
                v-for="distribuidora in distribuidoras"
                :key="distribuidora.id" 
                class="bg-teal-800 text-white font-medium text-xl w-40 sm:text-2xl sm:w-44 text-center py-8 rounded-md hover:bg-teal-900 justify-self-center"
                :to="`/client/ordenar/${distribuidora.nombre}`"  
            >
                {{ distribuidora.nombre }}  
            </RouterLink>
        </div>
    </section>
</template>