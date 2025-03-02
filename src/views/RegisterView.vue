<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getTokens } from "@/services/authService";
import { useUsuarioStore } from "@/stores/usuario";
import axios from "axios";
import { API_URL } from "@/config/api";

const router = useRouter();

const form = ref({
  rol: "",
})

const user = ref({
  username: "",
  apellido: "",
  email: "",
  password: "",
  area: "",
  distribuidora: "",
});

const areas = ref([]);
const distribuidoras = ref([]);

const register = async () => {
  const usuarioStore = useUsuarioStore();
  
  try {
    let endpoint = "";
    let requestData = {
      username: user.value.username,
      apellido: user.value.apellido,
      email: user.value.email,
      password: user.value.password
    };

    if (form.value.rol === 'CLIENTE') {
      endpoint = `${API_URL}/api/auth/register/cliente`;
      requestData.area = user.value.area;
    } else if (form.value.rol === 'ADMINISTRADOR_DISTRIBUIDORA') {
      endpoint = `${API_URL}/api/auth/register/admin/distribuidora`;
      requestData.distribuidora = user.value.distribuidora;
    } else if (form.value.rol === 'ADMINISTRADOR_AGUAS') {
      endpoint = `${API_URL}/api/auth/register/admin/aguas`
    }

    const access_token = await getTokens(endpoint, requestData)
    usuarioStore.setToken(access_token);

    alert("Registro exitoso");

    if (usuarioStore.area) {
      router.push("/client/home");
    } else if (usuarioStore.distribuidora) {
      router.push("/admin/distribuidora/home");
    } else if (usuarioStore.esAdminAguas) {
      router.push("/admin/aguas/home");
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Hubo un problema con el registro. Por favor, intente de nuevo.");
  }
};

const fetchAreas = async () => {
    try {
      const endpoint = `${API_URL}/api/area`;
        const response = await axios.get(endpoint);
        areas.value = response.data
    } catch (error) {
        console.error("Hubo un error al pedir las areas:", error);  
    };
};

const fetchDistribuidoras = async () => {
    try {
      const endpoint = `${API_URL}/api/viandas/distribuidoras`;
        const response = await axios.get(endpoint);
        distribuidoras.value = response.data
    } catch (error) {
        console.error("Hubo un error al pedir las distribuidoras:", error);  
    };
};

onMounted(fetchAreas);
onMounted(fetchDistribuidoras);

</script>

<template>
    <div class="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Crear Cuenta</h2>
        <form @submit.prevent="register" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
              <select
                id="role"
                v-model="form.rol"
                required
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Seleccione su rol</option>
                <option value="CLIENTE">Cliente</option>
                <option value="ADMINISTRADOR_DISTRIBUIDORA">Administrador de Distribuidora</option>
                <option value="ADMINISTRADOR_AGUAS">Administrador de Aguas</option>
              </select>
            </div>
            
            <div>
              <label for="name" class="sr-only">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                v-model="user.username"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label for="surname" class="sr-only">Apellido</label>
              <input
                id="surname"
                name="surname"
                type="text"
                required
                v-model="user.apellido"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Apellido"
              />
            </div>
            <div>
              <label for="email" class="sr-only">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                v-model="user.email"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="user.password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div v-if="form.rol === 'CLIENTE'">
            <label for="area" class="block text-sm font-medium text-gray-700">Área</label>
            <select
              id="area"
              v-model="user.area"
              required
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Seleccione su área</option>
              <option v-for="area in areas" :key="area.id" :value="area.nombre">{{ area.nombre }}</option>
            </select>
          </div>

          <div v-if="form.rol === 'ADMINISTRADOR_DISTRIBUIDORA'">
            <label for="distribuidora" class="block text-sm font-medium text-gray-700">Distribuidora</label>
            <select
              id="distribuidora"
              v-model="user.distribuidora"
              required
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Seleccione su distribuidora</option>
              <option v-for="distribuidora in distribuidoras" :key="distribuidora.id" :value="distribuidora.nombre">{{ distribuidora.nombre }}</option>
            </select>
          </div>
  
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrarse
            </button>
          </div>
        </form>
        <p class="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?
          <router-link to="/" class="font-medium text-blue-600 hover:text-blue-500">
            Inicia sesión aquí
          </router-link>
        </p>
      </div>
    </div>
  </template>