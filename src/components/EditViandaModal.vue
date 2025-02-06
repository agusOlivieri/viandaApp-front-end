<script setup>
import { DefineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    vianda: Object,
});

const emit = defineEmits(["close", "update"]);

const editedVianda = ref({ ...props.vianda });

watch(() => props.vianda, (newVianda) => {
    editedVianda.value = { ...newVianda };
}, { deep: true });

const closeModal = () => {
    emit("close");
};

const saveChanges = () => {
    emit("update", editedVianda.value);
    closeModal();
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-lg font-semibold mb-4">Editar Vianda</h2>

            <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input v-model="editedVianda.nombre" type="text" class="mt-1 w-full border p-2 rounded-md" />
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea v-model="editedVianda.descripcion" class="mt-1 w-full border p-2 rounded-md"></textarea>
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700">Precio</label>
                <input v-model="editedVianda.precio" type="number" class="mt-1 w-full border p-2 rounded-md" />
            </div>

            <div class="flex justify-end space-x-2 mt-4">
                <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-md">Cancelar</button>
                <button @click="saveChanges" class="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar</button>
            </div>
        </div>
    </div>

</template>