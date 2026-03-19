<script setup lang="ts">
import { renderTextContent } from "./scripts/functions";
import Input from "./Input.vue";
import type {
  dropdownContent,
  option,
  selectContent,
  textContent,
} from "./interfaces";
import CalcValue from "./CalcValue.vue";
import Select from "./Select.vue";
import { generateId } from "../../scripts/functions";
import Dropdown from "./dropdown/Dropdown.vue";

interface Props {
  name: string;
  content: textContent | selectContent | dropdownContent;
}

const { name, content } = defineProps<Props>();

const { type } = content;

// textContent인 경우에만 파싱
let splited: any[] = [];
if (type === "text") {
  splited = renderTextContent(name, content as textContent);
}

// selectContent인 경우 options 추출
let options: option[] = [];
let selectId = "";
if (type === "select") {
  options = (content as selectContent).options;

  options.forEach((opt, idx) => {
    opt["value"] = idx + 1;
  });

  selectId = generateId();
}

//
let category = "";
if (type === "dropdown") {
  category = (content as dropdownContent).category;
}
</script>

<template>
  <div v-if="type === 'text'">
    <div
      v-for="(item, idx) in splited"
      :key="idx"
      :class="[
        'content-container',
        { 'mr-5': typeof item !== 'string' || item === '100%' },
      ]"
    >
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
  <div v-else-if="type === 'select'">
    <template v-for="opt in options" :key="opt.value">
      <Select :name="name" :value="opt.value ?? 0">
        <template #label>{{ opt.label }}</template>
      </Select>
    </template>
  </div>
  <div v-else-if="type === 'dropdown'">
    <Dropdown :category="category" />
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.content-container {
  @apply inline;
}
</style>
