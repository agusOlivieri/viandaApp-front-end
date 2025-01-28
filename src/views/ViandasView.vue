<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
</script>

<template>
    <section id="viandas">
        <div class="w-full flex justify-center">
            <ViandaAppTable :columns="['nombre', 'descripcion', 'precio']" :endpoint="'http://localhost:8080/api/viandas'" :queryParams="{}" />
        </div>
        <div>
            <VolverBtn />
        </div>
    </section>
</template>