<script setup>
import HomeViewBtn from '@/components/HomeViewBtn.vue';

</script>

<template>
    <section id="home" class="flex flex-col h-screen w-full py-4">
        <h1 class="text-3xl font-bold text-center mt-4">¡Ordene su vianda!</h1>
        <div class="flex-grow flex justify-center items-center">
            <HomeViewBtn link="/admin/pedidos" linkText="Ver Pedidos" />
        </div>
  </section>
</template>