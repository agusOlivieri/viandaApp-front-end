<script setup>
import { ref } from 'vue';
import axios from "axios";

const vianda = ref({
    nombre: "",
    descripcion: "",
    precio: 0,
    distribuidora: "",
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const crearVianda = async () => {
    loading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    try {
        const response = await axios.post("/api/viandas/new", vianda.value);
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
    }
};
</script>

<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Crear Nueva Vianda</h2>
        <form @submit.prevent="crearVianda">
            <div class="mb-4">
                <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input v-model="vianda.nombre" type="text" id="nombre" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm" required/>
            </div>
            
            <div class="mb-4">
                <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                v-model="vianda.descripcion"
                id="descripcion"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                />
            </div>

            <div class="mb-4">
                <label for="distribuidora" class="block text-sm font-medium text-gray-700">Distribuidora</label>
                <input
                v-model="vianda.distribuidora"
                type="text"
                id="distribuidora"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                />
            </div>
        </form>
    </div>
</template>