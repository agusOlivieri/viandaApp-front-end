<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(["delete"]);

const handleDelete = () => {
    if (confirm("¿Seguro quiere eliminar esta vianda?")) {
        emit("delete", props.id)
    }
}
</script>

<template>
    <button @click="handleDelete" class="bg-red-400 px-3 py-1 rounded hover:bg-red-500">
        Eliminar
    </button>
</template>