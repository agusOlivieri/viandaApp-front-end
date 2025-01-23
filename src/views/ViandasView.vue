<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
</script>

<template>
    <section id="viandas">
        <ViandaAppTable
        :columns="['id', 'nombre', 'descripcion', 'precio']"
         endpoint="http://localhost:8080/api/viandas" 
        />
    </section>
</template>