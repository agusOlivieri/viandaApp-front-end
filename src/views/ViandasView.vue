<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
import { useUsuarioStore } from "@/stores/usuario";

const usuarioStore = useUsuarioStore();

// const distribuidora = usuarioStore.getDistribuidora();
const distribuidora = 'placeres';
</script>

<template>
    <section id="viandas">
        <div class="w-full ">
            <ViandaAppTable :columns="['nombre', 'descripcion', 'precio']" :endpoint="`http://localhost:8080/api/viandas/${distribuidora}`" :queryParams="{}" :acciones="true" />
        </div>
        <div>
            <VolverBtn />
        </div>
    </section>
</template>