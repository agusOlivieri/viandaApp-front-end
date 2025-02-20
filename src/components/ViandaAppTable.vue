<script setup>
import { ref} from "vue";

const props = defineProps({
    headers: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    acciones: {
        type: Boolean,
    },
})

const loading = ref(false);
const error = ref(null);

</script>

<template>
    <div class="w-full h-[350px] bg-white shadow-md rounded-lg">
        <!-- Contenedor para el scroll horizontal -->
        <div class="w-full h-full overflow-x-auto rounded-lg">
            <!-- Contenedor para el scroll vertical -->
            <div class="w-full h-full overflow-y-auto">
                <table class="w-full min-w-[600px] shadow-lg">
                    <thead class="border-b-2 sticky top-0 bg-white">
                        <tr>
                            <slot name="header"></slot>
                            <th v-if="acciones" class="px-1 py-2 text-left font-medium text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50 text-center">
                            <slot name="body" :item="item"></slot>
                            <slot name="actions" :item="item"></slot>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="loading" class="text-center text-gray-500 mt-4">Cargando...</div>
        <div v-if="error" class="text-center text-gray-500 mt-4">{{ error }}</div>
    </div>
</template>