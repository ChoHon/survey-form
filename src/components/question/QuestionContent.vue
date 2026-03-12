<script setup lang="ts">
import { renderTextContent } from "./functions";
import TextInput from "./components/Input.vue";
import type { content } from "./interfaces";
import { ref, provide } from "vue";
import CalcValue from "./components/CalcValue.vue";

interface Props {
  name: string;
  content: content;
}

const { name, content } = defineProps<Props>();
const { type, text, components } = content;

let splited: any[] = [];

if (type === "text") splited = renderTextContent(name, content);

// 모든 input 값들을 저장하는 반응형 객체
const inputValues = ref<Record<string, number>>({});

// 자식 컴포넌트에서 접근할 수 있도록 provide
provide("inputValues", inputValues);
</script>

<template>
  <div v-if="type === 'text'">
    <template v-for="(item, idx) in splited" :key="idx">
      <span v-if="typeof item === 'string'">{{ item }}</span>
      <TextInput
        v-else-if="item.type === 'input'"
        :input="item"
        :name="item.name"
      />
      <CalcValue
        v-else-if="item.type === 'calcValue'"
        :calcValue="item"
        :name="item.name"
      />
    </template>
  </div>
</template>
