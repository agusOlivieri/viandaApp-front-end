<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(["edit"]);

const handleEdit = () => {
    emit("edit", props.id);
};

</script>

<template>
    <button @click="handleEdit" class="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
        Editar
    </button>
</template>