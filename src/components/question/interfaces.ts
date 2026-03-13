export interface baseComponent {
  name: string;
  type: "input" | "calcValue";
  style?: {
    width?: string;
    align?: "left" | "center" | "right";
  };
  header?: string;
  footer?: string;
}

export interface input extends baseComponent {}

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
