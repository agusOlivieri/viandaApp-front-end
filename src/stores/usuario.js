import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useUsuarioStore = defineStore("usuario", {
    state: () => ({
        token: null,
        usuarioId: null,
        nombre: null,
        distribuidora: null,
        area: null,
        esAdminAguas: false,
    }),
    actions: {
        setToken(token) {
            this.token = token;

            const decoded = jwtDecode(token);
            this.usuarioId = decoded.userId;
            this.nombre = decoded.name;
            this.distribuidora = decoded.distribuidora;
            this.area = decoded.area;
            this.esAdminAguas = decoded.esAdminAguas;

            sessionStorage.setItem("token", token);
            sessionStorage.setItem("usuarioId", decoded.userId);
            sessionStorage.setItem("username", decoded.name);
            sessionStorage.setItem("distribuidora", decoded.distribuidora);
            sessionStorage.setItem("area", decoded.area);
            sessionStorage.setItem("esAdminAguas", decoded.esAdminAguas);
        },
        setDatosGuardados() {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    
                    if (decoded.exp < currentTime) {
                        console.log("El token ha expirado");
                        this.cerrarSesion();
                    } else {
                        this.token = token;
                        this.usuarioId = sessionStorage.getItem("usuarioId");
                        this.distribuidora = sessionStorage.getItem("distribuidora");
                        this.area = sessionStorage.getItem("area");
                        this.esAdminAguas = sessionStorage.getItem("esAdminAguas");
                    }
                } catch (error) {
                    console.error("Error al decodificar el token", error);
                    this.cerrarSesion();
                }
            }
        },
        cerrarSesion() {
            this.token = null;
            this.usuarioId = null;
            this.nombre = null;
            this.distribuidora = null;
            this.area = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("usuarioId");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("distribuidora");
            sessionStorage.removeItem("area");
            sessionStorage.removeItem("esAdminAguas");
        },
        clearUsuario() {
            this.token = null;
            this.usuarioId = null;
            this.nombre = null;
            this.distribuidora = null;
            this.area = null;
            this.esAdminAguas = false;
            sessionStorage.removeItem('access_token');
        },
        getDistribuidora() {
            return this.distribuidora;
        },
        getNombreUsuario() {
            return this.nombre;
        }
    },
})