<script setup lang="ts">
import type { tableCell, tableRow } from "../interfaces";
import Cell from "./Cell.vue";

interface Props {
  row: tableRow;
  name: string;
}
const { row, name } = defineProps<Props>();

if (!("type" in row)) row.type = "content";

let cells: tableCell[];
let isHeader: boolean;

if (row.type === "content") {
  cells = row.cells || [];
  isHeader = row.isHeader || false;
}
</script>

<template>
  <tr :class="[row.type, { header: isHeader }]">
    <Cell
      v-if="row.type === 'content'"
      v-for="(cell, cellIdx) in cells"
      :key="cellIdx"
      :cell="cell"
      :name="name"
    />
    <td v-else colspan="100">↕</td>
  </tr>
</template>

<style scoped>
@reference "tailwindcss";

tr {
  height: 36px;
}

tr.header {
  @apply border bg-gray-400;
}

tr.content {
  @apply border;
}

tr.divider {
  @apply border-0;
}
</style>
