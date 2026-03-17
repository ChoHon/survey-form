export interface baseComponent {
  name: string;
  type: "input" | "calcValue";
  style?: {
    width?: string;
    align?: "left" | "center" | "right";
    inTable?: boolean;
  };
}

export interface input extends baseComponent {
  header?: string;
  footer?: string;
}

export interface calcValue extends baseComponent {
  computed?: string;
  header?: string;
  footer?: string;
}

// 테이블 셀 정의
export interface tableCell {
  content: textContent;
  style?: {
    width?: string;
    align?: "left" | "center" | "right";
    fullInput?: boolean;
  };
  colspan?: number;
  rowspan?: number;
}

// 테이블 행 정의
export interface tableRow {
  cells: tableCell[];
  isHeader?: boolean;
}

// 테이블 정의
export interface table {
  rows: tableRow[];
}

export type component = input | calcValue;

export interface textContent {
  type?: "text";
  text?: string;
  components?: component[];
}

export interface tableContent {
  type: "table";
  table: table;
}

export interface option {
  label: string;
  value?: number;
}

export interface selectContent {
  type: "select";
  options: option[];
}

export type content = textContent | tableContent | selectContent;

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
