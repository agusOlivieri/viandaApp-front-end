<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getTokens } from "@/services/authService";
import { useUsuarioStore } from "@/stores/usuario";
import { API_URL } from "@/config/api";

const router = useRouter();
const credentials = ref({
  username: "",
  password: "",
});

const emit = defineEmits(["login"]);

const login = async () => {
  const usuarioStore = useUsuarioStore();

  try {
    const endpoint = `${API_URL}/api/auth/login`;
    const access_token = await getTokens(endpoint, credentials.value);
    let title;
    
    usuarioStore.setToken(access_token);
    console.log(usuarioStore.distribuidora)

    alert("Inicio de sesión exitoso");


    if (usuarioStore.area) {
      title = "Ordene su comida"
      router.push("/client/home");
    } else if (usuarioStore.distribuidora) {
      title = "Vea sus pedidos"
      router.push("/admin/distribuidora/home");
    } else if (usuarioStore.esAdminAguas) {
      title = "Aguas Riojanas"
      router.push("/admin/aguas/home");
    }

    emit("login", title);
    
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Credenciales inválidas. Por favor, intente nuevamente.");
  }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
        <form @submit.prevent="login" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="text"
                required
                v-model="credentials.username"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                v-model="credentials.password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p class="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            Regístrate aquí
          </router-link>
        </p>
      </div>
    </div>
</template>
  

  



  