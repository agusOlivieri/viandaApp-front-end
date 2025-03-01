<script setup>
import { RouterView } from 'vue-router';
import { useUsuarioStore } from './stores/usuario';

const usuarioStore = useUsuarioStore();
usuarioStore.setDatosGuardados();
</script>

<template>
  <div class="container mx-auto max-w-5xl flex flex-col min-h-screen">
    <RouterView />
  </div>
</template>

