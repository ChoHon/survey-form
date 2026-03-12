export interface baseComponent {
  name: string;
  type: "input" | "calcValue";
  style: {
    width?: string;
    align?: "left" | "center" | "right";
  };
}

export interface input extends baseComponent {
  header?: string;
  unit?: string;
}

export interface calcValue extends baseComponent {
  computed?: string;
}

export type component = input | calcValue;

export interface content {
  type: "text";
  text?: string;
  components?: component[];
}

interface baseContentMap {
  idx?: string;
  name: string;
  title: string;
  showTitleIdx?: boolean;
}

interface contentMapSingle extends baseContentMap {
  content: content;
  question?: never;
}

interface contentMapMultiple extends baseContentMap {
  content?: content;
  question: contentMap[];
}

export type contentMap = contentMapSingle | contentMapMultiple;
