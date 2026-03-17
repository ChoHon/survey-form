<script setup lang="ts">
import { generateId } from "../../scripts/functions";

interface Props {
  name: string;
  value: number;
}

const { name, value } = defineProps<Props>();
const id = generateId();
</script>

<template>
  <div>
    <input type="radio" :name="name" :value="value" :id="id" />
    <label :for="id"><slot name="label"></slot></label>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

div {
  @apply my-1;
}

input {
  @apply mr-2;
}
</style>
