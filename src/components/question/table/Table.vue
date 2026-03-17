<script setup lang="ts">
import type { table } from "../interfaces";
import Row from "./Row.vue";

interface Props {
  config: table;
  name: string;
}

const { config, name } = defineProps<Props>();

const { rows } = config;
</script>

<template>
  <table>
    <Row v-for="(row, rowIdx) in rows" :key="rowIdx" :row="row" :name="name" />
  </table>
</template>

<style scoped>
@reference "tailwindcss";

table {
  @apply w-full text-center;
}
</style>
