<script setup>
import { useUsuarioStore } from "@/stores/usuario";

defineProps({
    title: String,
    username: String 
});

</script>

<template>
    <nav class="bg-blue-600 px-6 py-3 flex justify-between items-center shadow-md">
        <h1 class="text-lg font-semibold">{{ title }}</h1>
        <span class="text-sm font-medium">{{ username }}</span>
    </nav>
</template>