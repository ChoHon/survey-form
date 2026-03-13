<script setup lang="ts">
import type { input } from "../interfaces";
import { ref, computed, inject, watch, type Ref } from "vue";

interface Props {
  input: input;
  name: string;
}

const { input, name } = defineProps<Props>();

const { style, header, footer } = input;

const { width = "100%", align = "left", ...rest } = style || {};

const value = ref<string>("");

const inputValues = inject<Ref<Record<string, number>>>("inputValues");

watch(value, (newValue) => {
  if (inputValues) {
    const splitedName = name.split(".");
    const inputName = splitedName[splitedName.length - 1];

    inputValues.value[inputName] = parseFloat(newValue) || 0;
  }
});
</script>

<template>
  {{ header }}
  <input :name="name" v-model="value" />
  {{ footer }}
</template>

<style scoped>
@import "tailwindcss";

input {
  width: v-bind(width);
  text-align: v-bind(align);
  @apply h-[32px] bg-gray-100 ml-2 px-2 text-base text-gray-900 border-b border-gray-500 focus:bg-red-100 focus:outline-none;
}
</style>
