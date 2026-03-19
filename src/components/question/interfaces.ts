export interface baseComponent {
  name: string;
  type: "input" | "calcValue" | "dropdown";
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
  content: textContent | dropdownContent;
  style?: {
    width?: string;
    align?: "left" | "center" | "right";
    fullInput?: boolean;
  };
  colspan?: number;
  rowspan?: number;
  isHeader?: boolean;
}

export interface divider {
  type: "divider";
}

// 테이블 행 정의
export interface tableRowContent {
  type?: "content";
  cells: tableCell[];
  isHeader?: boolean;
}

export type tableRow = tableRowContent | divider;

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

export interface dropdownContent {
  type: "dropdown";
  name: string;
  category: "address";
}

export type content =
  | textContent
  | tableContent
  | selectContent
  | dropdownContent;

export interface textSegment {
  content: string;
  style?: {
    color?: string;
    bold?: boolean;
    underline?: boolean;
  };
}

interface titleConfig {
  showIdx?: boolean;
}

interface baseContentMap {
  idx?: string;
  title: string;
  titleConfig?: titleConfig;
  name: string;
  description?: textSegment[];
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
