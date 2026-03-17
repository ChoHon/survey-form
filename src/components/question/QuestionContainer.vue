<script setup lang="ts">
import { inject, provide, ref, type Ref } from "vue";
import type { contentMap } from "./interfaces";
import QuestionContent from "./QuestionContent.vue";
import Table from "./components/table/Table.vue";

interface Props {
  isSub?: boolean;
  contentMap: contentMap;
}

const { contentMap, isSub = false } = defineProps<Props>();

const { showTitleIdx = true, ...rest } = contentMap;

contentMap.question?.forEach((question, subIdx) => {
  question.idx = `${contentMap.idx}-${subIdx + 1}`;
  question.name = `${contentMap.name}.${question.name}`;
});

const title = showTitleIdx
  ? `${contentMap.idx}. ${contentMap.title}`
  : contentMap.title;

const parentinputValues = inject<Ref<Record<string, number>> | null>(
  "inputValues",
  null,
);
const inputValues = parentinputValues || ref({});

if (!parentinputValues) {
  provide("inputValues", inputValues);
}
</script>

<template>
  <component :is="isSub ? 'p' : 'h2'">
    {{ title }}
  </component>

  <div v-if="contentMap.question">
    <div v-for="question in contentMap.question" class="question-container">
      <QuestionContainer :isSub="true" :contentMap="question" />
    </div>
  </div>
  <div v-else-if="contentMap.content?.type === 'table'" class="question-table">
    <Table :config="contentMap.content.table" :name="contentMap.name"></Table>
  </div>
  <div v-else class="question-content">
    <QuestionContent :content="contentMap.content" :name="contentMap.name" />
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.question-container {
  @apply mt-5;
}

.question-table {
  @apply mt-5;
}

.question-content {
  @apply my-2 pl-5;
}
</style>
