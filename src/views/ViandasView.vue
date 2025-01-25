<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';

</script>

<template>
    <section id="viandas">
        <div class="w-full flex justify-center">
            <ViandaAppTable :columns="['id', 'nombre', 'descripcion', 'precio']" :endpoint="'http://localhost:8080/api/viandas'" :queryParams="{}" />
        </div>
    </section>
</template>