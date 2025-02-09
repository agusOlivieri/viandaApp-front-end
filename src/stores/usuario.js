import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useUsuarioStore = defineStore("usuario", {
    state: () => ({
        token: null,
        usuarioId: null,
        distribuidora: null,
        area: null,
    }),
    actions: {
        setToken(token) {
            this.token = token;

            const decoded = jwtDecode(token);
            this.usuarioId = decoded.userId,
            this.distribuidora = decoded.distribuidora,
            this.area = decoded.area
        },
        clearUsuario() {
            this.token = null;
            this.usuarioId = null;
            this.distribuidora = null;
            this.area = null;
            localStorage.removeItem('access_token');
        },
        getDistribuidora() {
            return this.distribuidora;
        }
    },
})