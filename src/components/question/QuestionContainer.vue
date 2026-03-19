<script setup lang="ts">
import { inject, provide, ref, type Ref } from "vue";
import type { contentMap } from "./interfaces";
import QuestionContent from "./QuestionContent.vue";
import Table from "./table/Table.vue";
import TextSegment from "./TextSegment.vue";
import Dropdown from "./dropdown/Dropdown.vue";

interface Props {
  isSub?: boolean;
  contentMap: contentMap;
}

const { contentMap, isSub = false } = defineProps<Props>();

const { title: titleText, titleConfig, description, ...rest } = contentMap;

const { showIdx = true } = titleConfig || {};

contentMap.question?.forEach((question, subIdx) => {
  question.idx = `${contentMap.idx}-${subIdx + 1}`;
  question.name = `${contentMap.name}.${question.name}`;
});

const title = titleText ? `${showIdx ? contentMap.idx : ""} ${titleText}` : "";

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
  <component v-if="title" :is="isSub ? 'p' : 'h2'">
    {{ title }}
  </component>

  <div v-if="description" class="question-container">
    <template v-for="(seg, idx) in description" :key="idx">
      <TextSegment :segment="seg" />
    </template>
  </div>

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
