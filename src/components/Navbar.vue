<script setup>
import { useUsuarioStore } from "@/stores/usuario";

defineProps({
    title: String,
    username: String 
});

</script>

<template>
    <nav class="bg-blue-800 text-white px-8 py-1 flex justify-between items-center shadow-md fixed top-0 w-full">
        <img src="https://www.aguasriojanas.com.ar/oficial/gestion/web/ima/logo.png" class="w-36">
        <!-- <h1 class="text-lg font-semibold">{{ title }}</h1> -->
        <div class="flex flex-col justify-center items-center">
            <span class="text-2xl"><i class="pi pi-user" style="color: white"></i></span>
            <span class="-mt-1 text-sm font-medium">{{ username }}</span>
        </div>
    </nav>
</template>