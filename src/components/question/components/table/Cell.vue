<script setup lang="ts">
import type { tableCell } from "../../interfaces";
import QuestionContent from "../../QuestionContent.vue";

interface Props {
  cell: tableCell;
  name: string;
}
const { cell, name } = defineProps<Props>();
const { content, style, colspan = 1, rowspan = 1 } = cell;
const { width = "auto" } = style || {};

content["type"] = "text" as const;

let align = undefined;
if (content.components || content.text === "100%") {
  align = "right";
}

const isInputCell = content.components?.[0]?.type === "input";
</script>

<template>
  <td
    :colspan="colspan > 1 ? colspan : undefined"
    :rowspan="rowspan > 1 ? rowspan : undefined"
    :class="{ 'input-cell': isInputCell }"
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

.input-cell {
  /* background-color: oklch(92.8% 0.006 264.531); */
  @apply bg-gray-200;
}

/* input이 focus될 때 td 스타일 변경 */
td:has(input:focus) {
  @apply bg-red-100;
}
</style>
