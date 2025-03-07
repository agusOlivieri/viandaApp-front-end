<script setup>
import { ref, computed } from "vue";

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

const sortKey = ref(""); 
const sortOrder = ref("asc");

const sortedItems = computed(() => {
    if (!sortKey.value) return props.items;
    return [...props.items].sort((a, b) => {
        const valA = getNestedValue(a, sortKey.value);
        const valB = getNestedValue(b, sortKey.value);
        
        if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
        return 0;
    });
});

const sortColumn = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
    }
};

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

defineExpose({ sortColumn, sortKey, sortOrder });

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
                            <slot name="header" :sort="sortColumn" :sortKey="sortKey" :sortOrder="sortOrder"></slot>
                            <th v-if="acciones" class="py-2 text-center font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="(item, index) in sortedItems" :key="index" class="hover:bg-gray-50 text-center">
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