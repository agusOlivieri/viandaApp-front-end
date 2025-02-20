<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    link: {
        Type: String,
        required: true,
    },
    text: {
        Type: String,
        required: true,
    }
})
</script>

<template>
    <div class="my-4 mx-4 sm:mx-0 w-32">
        <RouterLink :to="link" class="btn bg-blue-600 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition">
            <span><i class="pi pi-plus" style="color: white"></i></span>
            <span class="text-white">{{ text }}</span>
        </RouterLink>    
    </div>
</template>