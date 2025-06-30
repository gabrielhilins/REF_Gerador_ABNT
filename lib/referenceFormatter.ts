import type { FieldConfig, FormData } from "@/types/form"
import { formatAuthorForDisplay, formatDateForReference } from "./formatters"

export const formatReference = (
  type: string,
  data: FormData,
  fieldConfigs: Record<string, FieldConfig[]>,
  hasMoreThanThreeAuthors: Record<string, boolean>,
): string => {
  const formattedData = { ...data }
  const fields = fieldConfigs[type]

  fields.forEach((field) => {
    if (field.type === "author" && data[field.name]) {
      formattedData[field.name] = formatAuthorForDisplay(
        data[field.name],
        field.name,
        field.allowMultiple ?? false,
        hasMoreThanThreeAuthors,
        type,
      )
    } else if (!formattedData[field.name]) {
      formattedData[field.name] = field.required ? `[${field.label} não informado]` : ""
    }
  })

  switch (type) {
    case "book":
      let bookRef = `${formattedData.author}. ${data.title || "[Título não informado]"}`
      if (data.edition && data.edition !== "1") bookRef += `. ${data.edition}. ed`
      bookRef += `. ${data.city || "[Local não informado]"}: ${data.publisher || "[Editora não informada]"}, ${data.year || "[Ano não informado]"}.`
      return bookRef

    case "article":
      let articleRef = `${formattedData.author}. ${data.title || "[Título não informado]"}. ${data.journal || "[Revista não informada]"}`
      if (data.volume) articleRef += `, v. ${data.volume}`
      if (data.number) articleRef += `, n. ${data.number}`
      if (data.pages) articleRef += `, p. ${data.pages}`
      articleRef += `, ${data.year || "[Ano não informado]"}.`
      return articleRef

    case "website":
      const authorPart =
        formattedData.author && formattedData.author !== "[Autor não informado]" ? `${formattedData.author}. ` : ""
      const formattedDate = formatDateForReference(data.accessDate || "")
      return `${authorPart}${data.title || "[Título não informado]"}. ${data.website || "[Site não informado]"}. Disponível em: <${data.url || "[URL não informada]"}>. Acesso em: ${formattedDate}.`

    case "chapter":
      let chapterRef = `${formattedData.author}. ${data.title || "[Título não informado]"}. In: ${formattedData.bookAuthor}. ${data.bookTitle || "[Título do livro não informado]"}`
      if (data.edition && data.edition !== "1") chapterRef += `. ${data.edition}. ed`
      chapterRef += `. ${data.city || "[Local não informado]"}: ${data.publisher || "[Editora não informada]"}, ${data.year || "[Ano não informado]"}`
      if (data.pages) chapterRef += `, p. ${data.pages}`
      chapterRef += "."
      return chapterRef

    case "thesis":
      return `${formattedData.author}. ${data.title || "[Título não informado]"}. ${data.type || "[Tipo não informado]"} (${data.program || "[Programa não informado]"}) - ${data.institution || "[Instituição não informada]"}, ${data.city || "[Local não informado]"}, ${data.year || "[Ano não informado]"}.`

    case "interview":
      const formattedInterviewDate = formatDateForReference(data.date || "")
      return `${formattedData.interviewee}. ${data.title || "[Título não informado]"}. Entrevista concedida a ${data.interviewer || "[Entrevistador não informado]"}. ${data.medium || "[Meio não informado]"}, ${formattedInterviewDate}.`

    default:
      return "[Tipo de referência inválido]"
  }
}
