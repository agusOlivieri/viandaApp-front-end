<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getTokens } from "@/services/authService";
import { useUsuarioStore } from "@/stores/usuario";


const router = useRouter();
const user = ref({
  username: "",
  apellido: "",
  email: "",
  password: "",
  rol: "CLIENTE",
});

const register = async () => {
  const usuarioStore = useUsuarioStore();

  try {
    const endpoint = "http://localhost:8080/api/auth/register";
    const access_token = await getTokens(endpoint, user.value);

    usuarioStore.setToken(access_token);

    alert("Registro exitoso");

    if (usuarioStore.rol === "CLIENTE") {
      router.push("/home");
    } else if (usuarioStore.rol === "ADMINISTRADOR") {
      router.push("/gestionar-pedidos");
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Hubo un problema con el registro. Por favor, intente de nuevo.");
  }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Crear Cuenta</h2>
        <form @submit.prevent="register" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
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
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
  
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
            <select
              id="role"
              v-model="user.role"
              required
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="CLIENTE">Cliente</option>
              <option value="ADMIN">Administrador</option>
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
      </div>
    </div>
  </template>