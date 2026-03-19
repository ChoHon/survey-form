<script setup lang="ts">
import type { textSegment } from "./interfaces";

const { segment } = defineProps<{
  segment: textSegment;
}>();

const { content, style } = segment;
const { color = "inherit", bold = false, underline = false } = style || {};

const boldStyle = bold ? "bold" : "normal";
const underlineStyle = underline ? "underline" : "none";
</script>

<template>
  <span>{{ content }}</span>
</template>

<style scoped>
@reference "tailwindcss";

span {
  color: v-bind(color);
  font-weight: v-bind(boldStyle);
  text-decoration: v-bind(underlineStyle);
}
</style>
