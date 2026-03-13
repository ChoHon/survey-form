<script setup lang="ts">
import { renderTextContent } from "./functions";
import Input from "./components/Input.vue";
import type { content } from "./interfaces";
import CalcValue from "./components/CalcValue.vue";

interface Props {
  name: string;
  content: content;
}

const { name, content } = defineProps<Props>();
const { type, text, components } = content;

let splited: any[] = [];

if (type === "text") splited = renderTextContent(name, content);
</script>

<template>
  <div v-if="type === 'text'">
    <div v-for="(item, idx) in splited" :key="idx" class="content-container">
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
@import "tailwindcss";

.content-container {
  @apply inline mr-5;
}
</style>
