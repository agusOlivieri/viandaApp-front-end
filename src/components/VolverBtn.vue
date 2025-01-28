<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const volver = () => {
    router.back();
}

</script>

<template>
    <div>
        <button @click="volver" class="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-gray600 transition">
            Volver
        </button>
    </div>
</template>