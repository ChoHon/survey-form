import type { content, input } from "./interfaces";

export function renderTextContent(
  name: string,
  content: content,
): (string | input)[] {
  const { type, text, components, ...rest } = content;
  const splited: (string | input)[] = [];

  if (type !== "text" || !text) {
    return splited;
  }

  const regex = /\{(\d+)\}/g;

  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      splited.push(text.slice(lastIdx, match.index));
    }

    if (components) {
      const pushedInput = components[parseInt(match[1])];
      pushedInput.name = pushedInput.name
        ? `${name}.${pushedInput.name}`
        : name;
      splited.push(pushedInput);
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    splited.push(text.slice(lastIdx));
  }

  return splited;
}
