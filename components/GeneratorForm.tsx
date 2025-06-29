"use client"

import type React from "react"

import { useState } from "react"
import { Book, FileText, Globe, BookOpen, GraduationCap, Mic } from "lucide-react"
import type { Reference } from "@/app/page"

interface GeneratorFormProps {
  onAddReference: (reference: Reference) => void
}

const referenceTypes = [
  { value: "book", label: "Livro", icon: <Book className="w-5 h-5" /> },
  { value: "article", label: "Artigo Científico", icon: <FileText className="w-5 h-5" /> },
  { value: "website", label: "Site", icon: <Globe className="w-5 h-5" /> },
  { value: "chapter", label: "Capítulo de Livro", icon: <BookOpen className="w-5 h-5" /> },
  { value: "thesis", label: "Tese/Dissertação", icon: <GraduationCap className="w-5 h-5" /> },
  { value: "interview", label: "Entrevista", icon: <Mic className="w-5 h-5" /> },
]

const fieldConfigs = {
  book: [
    { name: "author", label: "Autor(es)", required: true, placeholder: "SOBRENOME, Nome", type: "author" },
    { name: "title", label: "Título", required: true, placeholder: "Título do livro", type: "text" },
    { name: "city", label: "Local", required: true, placeholder: "São Paulo", type: "text" },
    { name: "publisher", label: "Editora", required: true, placeholder: "Editora", type: "text" },
    { name: "year", label: "Ano", required: true, placeholder: "2023", type: "year" },
  ],
  article: [
    { name: "author", label: "Autor(es)", required: true, placeholder: "SOBRENOME, Nome", type: "author" },
    { name: "title", label: "Título do artigo", required: true, placeholder: "Título do artigo", type: "text" },
    { name: "journal", label: "Nome da revista", required: true, placeholder: "Nome da revista", type: "text" },
    { name: "volume", label: "Volume", required: false, placeholder: "1", type: "volume" },
    { name: "number", label: "Número", required: false, placeholder: "2", type: "number" },
    { name: "pages", label: "Páginas", required: false, placeholder: "10-20", type: "pages" },
    { name: "year", label: "Ano", required: true, placeholder: "2023", type: "year" },
  ],
  website: [
    { name: "author", label: "Autor(es)", required: false, placeholder: "SOBRENOME, Nome (opcional)", type: "author" },
    { name: "title", label: "Título", required: true, placeholder: "Título da página", type: "text" },
    { name: "website", label: "Nome do site", required: true, placeholder: "Nome do site", type: "text" },
    { name: "url", label: "URL", required: true, placeholder: "https://exemplo.com", type: "url" },
    { name: "accessDate", label: "Data de acesso", required: true, placeholder: "DD/MM/AAAA", type: "date" },
  ],
  chapter: [
    { name: "author", label: "Autor do capítulo", required: true, placeholder: "SOBRENOME, Nome", type: "author" },
    { name: "title", label: "Título do capítulo", required: true, placeholder: "Título do capítulo", type: "text" },
    { name: "bookAuthor", label: "Autor do livro", required: true, placeholder: "SOBRENOME, Nome", type: "author" },
    { name: "bookTitle", label: "Título do livro", required: true, placeholder: "Título do livro", type: "text" },
    { name: "city", label: "Local", required: true, placeholder: "São Paulo", type: "text" },
    { name: "publisher", label: "Editora", required: true, placeholder: "Editora", type: "text" },
    { name: "year", label: "Ano", required: true, placeholder: "2023", type: "year" },
    { name: "pages", label: "Páginas", required: false, placeholder: "10-20", type: "pages" },
  ],
  thesis: [
    { name: "author", label: "Autor", required: true, placeholder: "SOBRENOME, Nome", type: "author" },
    { name: "title", label: "Título", required: true, placeholder: "Título da tese/dissertação", type: "text" },
    { name: "type", label: "Tipo", required: true, placeholder: "Tese ou Dissertação", type: "text" },
    { name: "program", label: "Programa", required: true, placeholder: "Programa de Pós-graduação", type: "text" },
    { name: "institution", label: "Instituição", required: true, placeholder: "Universidade", type: "text" },
    { name: "city", label: "Local", required: true, placeholder: "São Paulo", type: "text" },
    { name: "year", label: "Ano", required: true, placeholder: "2023", type: "year" },
  ],
  interview: [
    { name: "interviewee", label: "Entrevistado", required: true, placeholder: "SOBRENOME, Nome", type: "author" },
    { name: "title", label: "Título", required: true, placeholder: "Título da entrevista", type: "text" },
    { name: "interviewer", label: "Entrevistador", required: true, placeholder: "Nome do entrevistador", type: "text" },
    { name: "medium", label: "Meio", required: true, placeholder: "Rádio, TV, Podcast, etc.", type: "text" },
    { name: "date", label: "Data", required: true, placeholder: "DD/MM/AAAA", type: "date" },
  ],
}

const monthNames = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

export default function GeneratorForm({ onAddReference }: GeneratorFormProps) {
  const [selectedType, setSelectedType] = useState("book")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatAuthor = (value: string): string => {
    if (!value.trim()) return value

    // Dividir por ponto e vírgula para múltiplos autores
    const authors = value
      .split(";")
      .map((author) => {
        const trimmedAuthor = author.trim()
        if (!trimmedAuthor) return ""

        // Verificar se já tem vírgula (formato SOBRENOME, Nome)
        if (trimmedAuthor.includes(",")) {
          const [surname, name] = trimmedAuthor.split(",").map((part) => part.trim())
          return `${surname.toUpperCase()}, ${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`
        } else {
          // Se não tem vírgula, assumir que é só o sobrenome ou nome completo
          const words = trimmedAuthor.split(" ")
          if (words.length === 1) {
            return words[0].toUpperCase()
          } else {
            // Último palavra como sobrenome, resto como nome
            const surname = words[words.length - 1].toUpperCase()
            const firstName = words
              .slice(0, -1)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")
            return `${surname}, ${firstName}`
          }
        }
      })
      .filter((author) => author !== "")

    return authors.join("; ")
  }

  const formatDate = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "")

    // Limita a 8 dígitos
    const limited = numbers.slice(0, 8)

    // Adiciona as barras automaticamente
    if (limited.length >= 3 && limited.length <= 4) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`
    } else if (limited.length >= 5) {
      return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`
    }

    return limited
  }

  const formatDateForReference = (dateStr: string): string => {
    if (!dateStr || dateStr.length < 8) return dateStr

    const [day, month, year] = dateStr.split("/")
    const monthIndex = Number.parseInt(month) - 1

    if (monthIndex >= 0 && monthIndex < 12) {
      return `${day} ${monthNames[monthIndex]}. ${year}`
    }

    return dateStr
  }

  const formatYear = (value: string): string => {
    // Só permite números e limita a 4 dígitos
    return value.replace(/\D/g, "").slice(0, 4)
  }

  const formatPages = (value: string): string => {
    // Permite números e hífen
    return value.replace(/[^\d-]/g, "")
  }

  const formatUrl = (value: string): string => {
    // Se não começar com http, adicionar https://
    if (value && !value.startsWith("http://") && !value.startsWith("https://")) {
      return `https://${value}`
    }
    return value
  }

  const handleInputChange = (name: string, value: string, type: string) => {
    let formattedValue = value

    switch (type) {
      case "author":
        formattedValue = formatAuthor(value)
        break
      case "date":
        formattedValue = formatDate(value)
        break
      case "year":
        formattedValue = formatYear(value)
        break
      case "pages":
        formattedValue = formatPages(value)
        break
      case "url":
        formattedValue = formatUrl(value)
        break
      case "volume":
      case "number":
        formattedValue = value.replace(/\D/g, "") // Só números
        break
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const fields = fieldConfigs[selectedType as keyof typeof fieldConfigs]

    fields.forEach((field) => {
      const value = formData[field.name]?.trim()

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} é obrigatório`
        return
      }

      if (value) {
        switch (field.type) {
          case "author":
            if (field.required && value.length < 3) {
              newErrors[field.name] = "Nome do autor deve ter pelo menos 3 caracteres"
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
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatReference = (type: string, data: Record<string, string>) => {
    switch (type) {
      case "book":
        return `${data.author}. *${data.title}*. ${data.city}: ${data.publisher}, ${data.year}.`

      case "article":
        let articleRef = `${data.author}. ${data.title}. *${data.journal}*`
        if (data.volume) articleRef += `, v. ${data.volume}`
        if (data.number) articleRef += `, n. ${data.number}`
        if (data.pages) articleRef += `, p. ${data.pages}`
        articleRef += `, ${data.year}.`
        return articleRef

      case "website":
        const authorPart = data.author ? `${data.author}. ` : ""
        const formattedDate = formatDateForReference(data.accessDate)
        return `${authorPart}*${data.title}*. ${data.website}. Disponível em: ${data.url}. Acesso em: ${formattedDate}.`

      case "chapter":
        let chapterRef = `${data.author}. ${data.title}. In: ${data.bookAuthor}. *${data.bookTitle}*. ${data.city}: ${data.publisher}, ${data.year}`
        if (data.pages) chapterRef += `. p. ${data.pages}`
        chapterRef += "."
        return chapterRef

      case "thesis":
        return `${data.author}. *${data.title}*. ${data.year}. ${data.type} (${data.program}) - ${data.institution}, ${data.city}, ${data.year}.`

      case "interview":
        const formattedInterviewDate = formatDateForReference(data.date)
        return `${data.interviewee}. *${data.title}*. Entrevista concedida a ${data.interviewer}. ${data.medium}, ${formattedInterviewDate}.`

      default:
        return ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const reference: Reference = {
      id: Date.now().toString(),
      type: selectedType,
      data: formData,
      formatted: formatReference(selectedType, formData),
    }

    onAddReference(reference)
    setFormData({})
  }

  const currentFields = fieldConfigs[selectedType as keyof typeof fieldConfigs]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
            Tipo de Referência
          </label>
          <div className="grid grid-cols-2 gap-2">
            {referenceTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setSelectedType(type.value)
                  setFormData({})
                  setErrors({})
                }}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  selectedType === type.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {type.icon}
                <span className="text-sm font-medium font-poppins">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {currentFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-poppins">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "author" && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-poppins">
                  Para múltiplos autores, separe com ponto e vírgula (;)
                </p>
              )}

              <input
                type="text"
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value, field.type)}
                placeholder={field.placeholder}
                maxLength={field.type === "date" ? 10 : field.type === "year" ? 4 : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-poppins ${
                  errors[field.name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors[field.name] && <p className="mt-1 text-sm text-red-500 font-poppins">{errors[field.name]}</p>}
            </div>
          ))}
        </div>

        {Object.keys(formData).length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 font-poppins">Visualização Prévia:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
              {formatReference(selectedType, formData)}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium font-poppins"
        >
          Adicionar Referência
        </button>
      </form>
    </div>
  )
}
