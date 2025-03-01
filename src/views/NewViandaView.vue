<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import VolverBtn from '@/components/VolverBtn.vue';
import { useUsuarioStore } from '@/stores/usuario';
import { API_URL } from '@/config/api';

const usuarioStore = useUsuarioStore();

const vianda = ref({
    nombre: "",
    descripcion: "",
    precio: 0,
    distribuidora: usuarioStore.getDistribuidora(),
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const crearVianda = async () => {
    loading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    try {
        // const token = localStorage.getItem("access_token")
        const response = await axios.post(
            `${API_URL}/api/viandas/new`,
             vianda.value, 
            //  { headers: { Authorization: `Bearer ${token}` } }
        );
        successMessage.value = "¡Vianda creada exitosamente!";

        vianda.value = {
            nombre: "",
            descripcion: "",
            precio: 0,
            distribuidora: "",
        }
    } catch (err) {
        errorMessage.value = "Error al crear la vianda: " + err.message;
    } finally {
        loading.value = false;
    };
};
</script>

<template>
    <section id="new-vianda">
        <VolverBtn />
        <div class="px-6 md:px-0">
            <div class="w-full p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-xl font-bold mb-4">Crear Nueva Vianda</h2>
                <form @submit.prevent="crearVianda">
                    <div class="mb-4">
                        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                        <input v-model="vianda.nombre" type="text" id="nombre" class="mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm" required/>
                    </div>
                    
                    <div class="mb-4">
                        <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                        v-model="vianda.descripcion"
                        id="descripcion"
                        rows="3"
                        class="mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        ></textarea>
                    </div>
        
                    <div class="mb-4">
                        <label for="precio" class="block text-sm font-medium text-gray-700">Precio</label>
                        <input
                        v-model="vianda.precio"
                        type="number"
                        id="precio"
                        step="0.01"
                        class="mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        />
                    </div>
        
                    <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition" :disabled="loading">
                        {{ loading ? "Creando..." : "Crear Vianda" }}
                    </button>
                </form>
                
                <p v-if="successMessage" class="mt-4 text-green-600 font-medium">{{ successMessage }}</p>
                <p v-if="errorMessage" class="mt-4 text-red-600 font-medium">{{ errorMessage }}</p>
            </div>
        </div>
    </section>
</template>