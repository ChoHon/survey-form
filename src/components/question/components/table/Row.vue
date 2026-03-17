<script setup lang="ts">
import type { tableRow } from "../../interfaces";
import Cell from "./Cell.vue";

interface Props {
  row: tableRow;
  name: string;
}
const { row, name } = defineProps<Props>();

const { cells, isHeader = false } = row;
</script>

<template>
  <component :is="isHeader ? 'thead' : 'tr'">
    <Cell
      v-for="(cell, cellIdx) in cells"
      :key="cellIdx"
      :cell="cell"
      :name="name"
    />
  </component>
</template>

<style scoped>
@reference "tailwindcss";

thead {
  height: 36px;
  @apply border bg-gray-400;
}

tr {
  height: 36px;
  @apply border;
}
</style>
