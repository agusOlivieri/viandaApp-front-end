<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    link: { 
        type: String,
        required: true, 
    },
    linkText: {
        type: String, 
        required: true,
    }
})
</script>

<template>
    <RouterLink :to="link" class="bg-blue-800 text-white font-medium py-8 px-8 rounded-md hover:bg-blue-900 justify-self-center">
        {{ linkText }}
    </RouterLink>
</template>