<script setup>
import { RouterView } from 'vue-router';
import { useUsuarioStore } from './stores/usuario';
import Navbar from './components/Navbar.vue';
import { onMounted, ref } from 'vue';


const usuarioStore = useUsuarioStore();
usuarioStore.setDatosGuardados();

const estaAutenticado = ref(false);
const usuario = ref("");
const titulo = ref("");

const handleLogin = (title) => {
  usuario.value = usuarioStore.getNombreUsuario();
  estaAutenticado.value = true;
  titulo.value = title;
};

const verificarUsuarioLogueado = () => {
  const userId = sessionStorage.getItem("usuarioId")

  if (userId) {
    estaAutenticado.value = true;
    usuario.value = sessionStorage.getItem("username");
    
    if (usuarioStore.area) {
      titulo.value = "Ordene su comida"
    } else if (usuarioStore.distribuidora) {
      titulo.value = "Vea sus pedidos"
    } else if (usuarioStore.esAdminAguas) {
      titulo.value = "Aguas Riojanas"
    }
  }
}

onMounted(verificarUsuarioLogueado);
</script>

<template>
  <Navbar v-if="estaAutenticado" :title="titulo" :username="usuario" />
  <div class="container mx-auto max-w-5xl flex flex-col min-h-screen">
    <RouterView @login="handleLogin"/>
  </div>
</template>

