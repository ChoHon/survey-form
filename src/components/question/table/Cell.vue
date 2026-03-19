<script setup lang="ts">
import type { tableCell } from "../interfaces";
import QuestionContent from "../QuestionContent.vue";

interface Props {
  cell: tableCell;
  name: string;
}
const { cell, name } = defineProps<Props>();
const { content, style, colspan = 1, rowspan = 1, isHeader = false } = cell;
let { width = "auto", align = "center", fullInput = true } = style || {};

content.type = content.type ? content.type : "text";

let isInputCell = false;
if (content.type === "text" && content.components) {
  isInputCell = content.components.some(
    (component) => component.type === "input",
  );
} else if (content.type === "dropdown") {
  isInputCell = true;
}
</script>

<template>
  <td
    :colspan="colspan > 1 ? colspan : undefined"
    :rowspan="rowspan > 1 ? rowspan : undefined"
    :class="{
      'input-cell': isInputCell,
      'full-input': fullInput,
      header: isHeader,
    }"
  >
    <QuestionContent :content="content" :name="name" />
  </td>
</template>

<style scoped>
@reference "tailwindcss";

td {
  width: v-bind(width);
  text-align: v-bind(align);
  @apply border;
}

td.header {
  @apply bg-gray-400;
}

.input-cell {
  /* background-color: oklch(92.8% 0.006 264.531); */
  @apply bg-gray-200;
}

/* input이 focus될 때 td 스타일 변경 */
td.full-input:has(input:focus) {
  @apply bg-red-100;
}

td.full-input:has(input) :deep(input) {
  @apply border-0;
}
</style>
