import { parseFormData } from "./functions";

function loadFormData(page_name: string) {
  const savedData = sessionStorage.getItem(page_name);
  if (!savedData) return;

  const data = JSON.parse(savedData);
  const form = document.getElementById("surveyForm") as HTMLFormElement;
  if (!form) return;

  // 모든 input 요소를 순회하며 값 채우기
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    const name = input.name;
    if (!name) return;

    // name을 경로로 분해 (예: "A.respondent.name" -> ["A", "respondent", "name"])
    const path = name.split(".");
    let value = data;

    // 중첩된 객체에서 값 찾기
    for (const key of path) {
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      } else {
        value = undefined;
        break;
      }
    }

    // 값이 있으면 input에 설정
    if (value !== undefined && value !== null) {
      input.value = String(value);
    }
  });
}

function getProgressButtonEl() {
  const progressGroup = document.getElementById("progress-group");

  const buttons = progressGroup?.querySelectorAll("a");
  const result = {
    prevButton: null as HTMLElement | null,
    nextButton: null as HTMLElement | null,
  };

  if (buttons?.length === 1) result.nextButton = buttons[0];
  else if (buttons?.length === 2) {
    result.prevButton = buttons[0];
    result.nextButton = buttons[1];
  }

  return result;
}

function saveFormData(page_name: string) {
  const { prevButton, nextButton } = getProgressButtonEl();

  const save = () => {
    const serveyForm = document.getElementById("surveyForm");
    const formData = new FormData(serveyForm as HTMLFormElement);
    const parsedData = parseFormData(formData);

    sessionStorage.setItem(page_name, JSON.stringify(parsedData));
  };

  prevButton?.addEventListener("click", save, { once: true });
  nextButton?.addEventListener("click", save, { once: true });
}

export { loadFormData, saveFormData };
