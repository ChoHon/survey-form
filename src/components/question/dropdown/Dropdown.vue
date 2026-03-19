<script setup lang="ts">
import Address from "./address.vue";

const { category } = defineProps<{
  category: string;
}>();

function matchComponent(category: string) {
  switch (category) {
    case "address":
      return Address;
    default:
      return Address;
  }
}
</script>

<template>
  <component :is="matchComponent(category)" />
</template>
