<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
</script>

<template>
    <section id="viandas">
        <div class="w-full ">
            <ViandaAppTable :columns="['cliente', 'vianda', 'precio', 'fecha']" :endpoint="'http://localhost:8080/api/pedidos'" :queryParams="{}" :acciones="false"/>
        </div>
        <div>
            <VolverBtn />
        </div>
    </section>
</template>