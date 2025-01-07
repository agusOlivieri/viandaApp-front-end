<script setup>
import Vianda from '@/components/Vianda.vue'
</script>

<template>
    <section class="flex justify-center items-center h-screen">
        <div class="w-3/4 max-w-4xl bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-center mb-6">Elija Su Vianda</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Vianda></Vianda>
            </div>
        </div>
    </section>
</template>