<script setup>

const emit = defineEmits(["reporte"]);

const handleReporte = () => {
    emit("reporte");
}

</script>

<template>
        <div class="my-4 mx-4 sm:mx-0">
        <button @click="handleReporte" class="bg-lime-700 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-lime-900 transition">
            Descargar Reporte Mensual
        </button>
    </div>
</template>