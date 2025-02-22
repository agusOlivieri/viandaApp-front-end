<script setup>
import { ref } from 'vue';
import ConfirmacionModal from '@/components/ConfirmacionModal.vue';
import { getFormattedDateTime, newPedido } from '@/services/pedidoService';
import { useUsuarioStore } from '@/stores/usuario';

const props = defineProps({
    vianda: {
        type: Object,
        required: true
    }
});

const mostrarConfirmacion = ref(false);
const mensajeConfirmacion = ref('');

const pedido = ref({
    usuarioId: "",
    viandaId: "",
    fechaHora: "",
})

const seleccionarVianda = () => {
    mensajeConfirmacion.value = `¿Desea seleccionar la vianda "${props.vianda.nombre}"?`
    mostrarConfirmacion.value = true;
};

const confirmarSeleccion = () => {
    const usuarioStore = useUsuarioStore();

    pedido.value.usuarioId = usuarioStore.usuarioId;
    // pedido.value.usuarioId = 5;
    pedido.value.fechaHora = getFormattedDateTime();
    pedido.value.viandaId = props.vianda.id;

    // console.log("requestBody: ", pedido.value)

    const nuevoPedido = newPedido(pedido.value);

    if (nuevoPedido) {
        alert(`Ha seleccionado: ${props.vianda.nombre}` + "\n" + "Por favor pase a retirar su pedido")
        mostrarConfirmacion.value = false
    }

};

const cancelarSeleccion = () => {
    mostrarConfirmacion.value = false
};

</script>

<template>
    <div class="bg-sky-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800">{{ props.vianda.nombre }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ props.vianda.descripcion }}</p>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-lg sm:text-xl font-semibold text-blue-700">${{ props.vianda.precio }}</span>
                <button class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700" @click="seleccionarVianda">
                    Seleccionar
                </button>
            </div>
        </div>
    </div>
            
    <!-- Ventana de confirmación -->
    <ConfirmacionModal :mostrar="mostrarConfirmacion" :mensaje="mensajeConfirmacion" @confirmar="confirmarSeleccion" @cancelar="cancelarSeleccion"/> 
</template>