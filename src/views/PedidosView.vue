<script setup>
import ViandaAppTable from '@/components/ViandaAppTable.vue';
import VolverBtn from '@/components/VolverBtn.vue';
import { useUsuarioStore } from "@/stores/usuario";

const usuarioStore = useUsuarioStore();

const distribuidora = usuarioStore.getDistribuidora();
</script>

<template>
    <section id="viandas">
        <div class="w-full ">
            <ViandaAppTable :columns="['cliente', 'vianda', 'precio', 'fecha']" :endpoint="`http://localhost:8080/api/pedidos/${distribuidora}`" :queryParams="{}" :acciones="false"/>
        </div>
        <div>
            <VolverBtn />
        </div>
    </section>
</template>