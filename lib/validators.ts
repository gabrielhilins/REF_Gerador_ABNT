import type { FieldConfig, FormData } from "@/types/form"

export const validateForm = (
  selectedType: string,
  fieldConfigs: Record<string, FieldConfig[]>,
  formData: FormData,
  hasMoreThanThreeAuthors: Record<string, boolean>,
): FormData => {
  const newErrors: FormData = {}
  const fields = fieldConfigs[selectedType]

  fields.forEach((field) => {
    const value = formData[field.name]?.trim()

    if (field.required && !value) {
      newErrors[field.name] = `${field.label} é obrigatório`
      return
    }

    if (value) {
      switch (field.type) {
        case "author":
          if (field.required && value.replace(/[^a-zA-Z]/g, "").length < 3) {
            newErrors[field.name] = `${field.label} deve ter pelo menos 3 caracteres`
          } else if (field.allowMultiple && hasMoreThanThreeAuthors[field.name]) {
            if (value.includes(";")) {
              newErrors[field.name] =
                `Apenas um autor (Sobrenome, Nome) é permitido quando "Mais de 3 autores" está selecionado`
            } else if (!value.match(/^[A-Za-z\s]+(,\s*[A-Za-z\s]+)?$/)) {
              newErrors[field.name] = `${field.label} deve estar no formato "Sobrenome, Nome" ou "Sobrenome"`
            }
          } else if (field.allowMultiple) {
            const authors = value
              .split(";")
              .map((a) => a.trim())
              .filter((a) => a)
            if (authors.length > 3) {
              newErrors[field.name] = "Máximo de 3 autores permitido (ou marque 'Mais de 3 autores')"
            }
            authors.forEach((author, index) => {
              if (!author.match(/^[A-Za-z\s]+(,\s*[A-Za-z\s]+)?$/)) {
                newErrors[field.name] =
                  `${field.label} ${index + 1} deve estar no formato "Sobrenome, Nome" ou "Sobrenome"`
              }
            })
            if (hasMoreThanThreeAuthors[field.name] && authors.length < 1) {
              newErrors[field.name] = "Pelo menos um autor deve ser fornecido"
            }
          } else {
            if (!value.match(/^[A-Za-z\s]+(,\s*[A-Za-z\s]+)?$/)) {
              newErrors[field.name] = `${field.label} deve estar no formato "Sobrenome, Nome" ou "Sobrenome"`
            }
          }
          break

        case "date":
          if (value.length !== 10) {
            newErrors[field.name] = "Data deve estar no formato DD/MM/AAAA"
          } else {
            const [day, month, year] = value.split("/")
            const dayNum = Number.parseInt(day)
            const monthNum = Number.parseInt(month)
            const yearNum = Number.parseInt(year)

            if (dayNum < 1 || dayNum > 31) {
              newErrors[field.name] = "Dia inválido (1-31)"
            } else if (monthNum < 1 || monthNum > 12) {
              newErrors[field.name] = "Mês inválido (1-12)"
            } else if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
              newErrors[field.name] = "Ano inválido"
            }
          }
          break

        case "year":
          const yearNum = Number.parseInt(value)
          if (value.length !== 4 || yearNum < 1900 || yearNum > new Date().getFullYear()) {
            newErrors[field.name] = "Ano deve ter 4 dígitos e ser válido"
          }
          break

        case "url":
          if (!value.startsWith("http://") && !value.startsWith("https://")) {
            newErrors[field.name] = "URL deve começar com http:// ou https://"
          }
          break

        case "pages":
          if (value && !value.match(/^\d+(-\d+)?$/)) {
            newErrors[field.name] = 'Páginas devem estar no formato "10" ou "10-20"'
          }
          break

        case "edition":
          if (value && !value.match(/^\d+$/)) {
            newErrors[field.name] = "Edição deve conter apenas números"
          }
          break
      }
    }
  })

  return newErrors
}
