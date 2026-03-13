<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import type { calcValue } from "../interfaces";

interface Props {
  calcValue: calcValue;
  name: string;
}

const { calcValue: config, name } = defineProps<Props>();

const { style, header, footer, computed: formula } = config;

const inputValues = inject<Ref<Record<string, number>>>("inputValues");

const calculatedValue = computed(() => {
  if (!formula || !inputValues) return 0;

  // 계산식에서 {total}, {direct} 등을 실제 값으로 치환
  const regex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
  let result = formula;
  let match;

  while ((match = regex.exec(formula)) !== null) {
    const inputName = match[1];

    const targetValue = inputValues.value[inputName] || 0;
    result = result.replace(match[0], targetValue.toString());
  }

  try {
    const calculated = eval(result);
    return calculated.toString();
  } catch {
    return "ERROR";
  }
});
</script>

<template>
  {{ header }}
  <span>{{ calculatedValue }}</span>
  {{ footer }}
  <!-- <input type="hidden" :name="name" :value="calculatedValue" /> -->
</template>

<style scoped>
@import "tailwindcss";

span {
  @apply ml-2 text-blue-600 font-bold;
}
</style>
