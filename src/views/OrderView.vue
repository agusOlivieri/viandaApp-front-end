<script setup>
import ViandasListing from '@/components/ViandasListing.vue'
import VolverBtn from '@/components/VolverBtn.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const distribuidora = route.params.distribuidora;
</script>

<template>
    <div>
        <h1>Viandas de {{ distribuidora }}</h1>
        <ViandasListing :distribuidora="distribuidora"/>
        <VolverBtn />
    </div>
</template>