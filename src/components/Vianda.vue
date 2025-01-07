<script setup>
const viandas = [
                {
                    id: 1,
                    title: 'vianda1'
                },
                {
                    id: 2,
                    title: 'vianda2'
                },
                {
                    id: 3,
                    title: 'vianda3'
                },
                {
                    id: 4,
                    title: 'vianda4'
                }
            ]
</script>

<template>
    <div v-for="vianda in viandas" :key="vianda.id" class="bg-sky-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img src="../assets/img/fideos.jpg" class="w-40">
    </div>
</template>