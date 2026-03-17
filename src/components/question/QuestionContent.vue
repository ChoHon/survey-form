<script setup lang="ts">
import { renderTextContent } from "./scripts/functions";
import Input from "./components/Input.vue";
import type { textContent } from "./interfaces";
import CalcValue from "./components/CalcValue.vue";

interface Props {
  name: string;
  content: textContent;
}

const { name, content } = defineProps<Props>();
const { type, text, components } = content;

let splited: any[] = [];

if (type === "text") splited = renderTextContent(name, content);
</script>

<template>
  <div v-if="type === 'text'">
    <div
      v-for="(item, idx) in splited"
      :key="idx"
      :class="[
        'content-container',
        { 'mr-5': typeof item !== 'string' || item === '100%' },
      ]"
    >
      <span v-if="typeof item === 'string'">{{ item }}</span>
      <Input
        v-else-if="item.type === 'input'"
        :input="item"
        :name="item.name"
      />
      <CalcValue
        v-else-if="item.type === 'calcValue'"
        :calcValue="item"
        :name="item.name"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.content-container {
  @apply inline;
}
</style>
