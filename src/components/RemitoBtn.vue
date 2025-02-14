<script setup>

const emit = defineEmits(["remito"]);

const handleGenerarRemito = () => {
    emit("remito");
}

</script>

<template>
        <div class="my-6">
        <button @click="handleGenerarRemito" class=" bg-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-amber-800 transition">
            Generar Remito
        </button>
    </div>
</template>