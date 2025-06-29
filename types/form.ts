export interface FieldConfig {
  name: string
  label: string
  required: boolean
  placeholder: string
  type: "text" | "author" | "edition" | "year" | "volume" | "number" | "pages" | "url" | "date"
  allowMultiple?: boolean
}

export interface FormData {
  [key: string]: string
}
