<script setup lang="ts">
import { ref, watch } from "vue";
import { district, subDistrict } from "../../../data/district";

const selected = ref<string>("");
const selectedSubDistrict = ref<string[]>([]);

watch(selected, () => {
  selectedSubDistrict.value =
    subDistrict[selected.value as keyof typeof subDistrict];
});
</script>

<template>
  <select v-model="selected">
    <option value="none">-</option>
    <option v-for="(value, _, idx) in district" :key="idx" :value="value">
      {{ value }}
    </option>
  </select>
  <select>
    <option
      v-for="(value, idx) in selectedSubDistrict"
      :key="idx"
      :value="value"
    >
      {{ value }}
    </option>
  </select>
</template>

<style scoped>
@reference "tailwindcss";

select {
  width: 50%;
  @apply h-full pl-5;
}
</style>
