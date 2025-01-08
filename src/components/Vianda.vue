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
        <img src="../assets/img/fideos.jpg" class="px-5 mt-4 w-64 place-self-center rounded-lg">
        <div class="p-4">
            <h3 class="text-lg fonrt-bold text-gray-800">{{ vianda.title }}</h3>
            <p class="text-sm text-gray-600 mt-2">Aquí va una descripción de la comida</p>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-xl font-semibold text-blue-700">$800</span>
                <button class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700">
                    Seleccionar
                </button>
            </div>
        </div>
    </div>
</template>