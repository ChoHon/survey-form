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
    <template v-for="(row, rowIdx) in rows" :key="rowIdx">
      <Row :row="row" :name="name" />
    </template>
  </table>
</template>

<style scoped>
@reference "tailwindcss";

table {
  @apply w-full text-center;
}
</style>
