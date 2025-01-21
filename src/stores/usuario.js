import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useUsuarioStore = defineStore("usuario", {
    state: () => ({
        token: null,
        usuarioId: null,
        rol: null,
    }),
    actions: {
        setToken(token) {
            this.token = token;

            const decoded = jwtDecode(token);
            this.usuarioId = decoded.userId,
            this.rol = decoded.role
        },
        clearUsuario() {
            this.token = null;
            this.usuarioId = null;
            this.rol = null;
            localStorage.removeItem('access_token');
        },
    },
})