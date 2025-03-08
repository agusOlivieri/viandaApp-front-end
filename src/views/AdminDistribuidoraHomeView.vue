<script setup>
import HomeViewBtn from '@/components/HomeViewBtn.vue';
</script>

<template>
    <section id="home" class="flex flex-col h-screen w-full py-4">
        <!-- <h1 class="text-3xl font-bold text-center mt-4">Vea sus pedidos</h1> -->
        <div class="flex-grow flex justify-center items-center flex-col gap-4">
            <HomeViewBtn link="/admin/distribuidora/pedidos" linkText="Ver Pedidos" />
            <HomeViewBtn link="/admin/distribuidora/viandas" linkText="Ver Viandas" />
        </div>
  </section>
</template>