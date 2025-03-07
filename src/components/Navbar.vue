<script setup>
import { useUsuarioStore } from "@/stores/usuario";

defineProps({
    title: String,
    username: String 
});

</script>

<template>
    <nav class="bg-blue-600 text-white px-8 py-2 flex justify-between items-center shadow-md">
        <h1 class="text-lg font-semibold">{{ title }}</h1>
        <div class="flex flex-col justify-center items-center">
            <span class="text-2xl"><i class="pi pi-user" style="color: white"></i></span>
            <span class="-mt-1 text-sm font-medium">{{ username }}</span>
        </div>
    </nav>
</template>