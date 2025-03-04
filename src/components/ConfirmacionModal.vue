<script setup>
import { ref } from 'vue';

defineProps({
    mensaje: {
        type: String,
    },
    mostrar: {
        type: Boolean,
        required: true
    }
});

const cantidad = ref(1);

const emit = defineEmits(['confirmar', 'cancelar']);

const handleConfirmar = () => {
    emit("confirmar", cantidad.value);
}

</script>

<template>
    <div v-if="mostrar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 class="text-lg font-bold mb-4">Confirme</h2>
            <p class="text-gray-700 mb-3">{{ mensaje }}</p>
            <input 
            v-model="cantidad"
            class="px-2 py-1 mb-3 block w-full rounded-md sm:text-sm border-2 border-black"
            type="number"
            placeholder="Cantidad"
            >
            <div class="flex justify-end space-x-4">
                <button class="bg-gray-300 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-400" @click="$emit('cancelar')">Cancelar</button>
                <button class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600" @click="handleConfirmar">Confirmar</button>
            </div>
        </div>
    </div>
</template>