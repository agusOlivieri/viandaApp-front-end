<script setup>
import Vianda from '@/components/Vianda.vue'
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    distribuidora: {
        type: String,
        required: true
    }
})

const viandas = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchViandas = async () => {
    if (!props.distribuidora) return;

    loading.value = true;
    error.value = null;
    
    try {
        const endpoint = `https://viandaapp-production.up.railway.app/api/viandas/${props.distribuidora}`;
        const response = await axios.get(endpoint);
        viandas.value = response.data;
    } catch (error) {
        console.error("Error al intentar obtener las viandas:", error.message);
    } finally {
        loading.value = false;
    };
};

onMounted(fetchViandas);
watch(() => props.distribuidora, fetchViandas);
</script>

<template>
    <section id="order" class="my-4 flex justify-center">
        <div class="w-full max-sm:w-5/6 bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-center mb-6">Elija Su Vianda</h2>
            <div class="max-h-[270px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-3">
                <Vianda v-for="vianda in viandas" :key="vianda.id" :vianda="vianda" />
            </div>
        </div>
    </section>
</template>