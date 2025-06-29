"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { Book, FileText, Globe, BookOpen, GraduationCap, Mic } from "lucide-react"
import type { Reference } from "@/app/page"
import type { FormData } from "@/types/form"
import { fieldConfigs } from "@/data/fieldConfigs"
import { formatDate, formatYear, formatPages, formatUrl } from "@/lib/formatters"
import { validateForm } from "@/lib/validators"
import { formatReference } from "@/lib/referenceFormatter"

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

export default function GeneratorForm({ onAddReference }: GeneratorFormProps) {
  const [selectedType, setSelectedType] = useState<string>("book")
  const [formData, setFormData] = useState<FormData>({})
  const [errors, setErrors] = useState<FormData>({})
  const [hasMoreThanThreeAuthors, setHasMoreThanThreeAuthors] = useState<Record<string, boolean>>({})

  const handleInputChange = (name: string, value: string, type: string, allowMultiple?: boolean) => {
    let formattedValue = value

    if (type === "author" && allowMultiple && !hasMoreThanThreeAuthors[name]) {
      const authors = value
        .split(";")
        .map((a) => a.trim())
        .filter((a) => a)
      if (authors.length > 3) {
        return // Prevent adding more than 3 authors
      }
    }

    if (type === "author" && allowMultiple && hasMoreThanThreeAuthors[name]) {
      formattedValue = value.replace(/;/g, "").trim()
    }

    switch (type) {
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
      case "edition":
        formattedValue = value.replace(/\D/g, "")
        break
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleMoreThanThreeAuthorsChange = (fieldName: string, checked: boolean) => {
    setHasMoreThanThreeAuthors((prev) => ({ ...prev, [fieldName]: checked }))
    if (checked && formData[fieldName]) {
      const firstAuthor = formData[fieldName].split(";")[0]?.trim() || ""
      setFormData((prev) => ({ ...prev, [fieldName]: firstAuthor }))
    }
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const handleValidation = () => {
    const newErrors = validateForm(selectedType, fieldConfigs, formData, hasMoreThanThreeAuthors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!handleValidation()) return

    const reference: Reference = {
      id: Date.now().toString(),
      type: selectedType,
      data: formData,
      formatted: formatReference(selectedType, formData, fieldConfigs, hasMoreThanThreeAuthors),
    }

    onAddReference(reference)
    setFormData({})
    setHasMoreThanThreeAuthors({})
    setErrors({})
  }

  const currentFields = fieldConfigs[selectedType]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
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
                  setHasMoreThanThreeAuthors({})
                }}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-300 font-poppins
                focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:shadow-lg
                ${
                  selectedType === type.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-sm"
                }`}
              >
                {type.icon}
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {currentFields.map((field) => (
            <div key={field.name} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-poppins">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "author" && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-poppins">
                  {field.allowMultiple && hasMoreThanThreeAuthors[field.name]
                    ? "Digite apenas o primeiro autor (Sobrenome, Nome)"
                    : field.allowMultiple
                      ? "Separe até 3 autores com ponto e vírgula (;). Ex: Sobrenome, Nome; Sobrenome, Nome"
                      : selectedType === "website"
                        ? "Digite o nome da pessoa (Sobrenome, Nome) ou organização"
                        : "Digite no formato Sobrenome, Nome"}
                </p>
              )}

              {field.type === "edition" && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-poppins">
                  Caso não seja primeira edição, especifique
                </p>
              )}

              {field.type === "author" && field.allowMultiple && (
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`${field.name}-more-than-three`}
                    checked={hasMoreThanThreeAuthors[field.name] || false}
                    onChange={(e) => handleMoreThanThreeAuthorsChange(field.name, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${field.name}-more-than-three`}
                    className="text-sm text-gray-700 dark:text-gray-300 font-poppins"
                  >
                    Mais de 3 autores?
                  </label>
                </div>
              )}

              <input
                type="text"
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value, field.type, field.allowMultiple)}
                placeholder={field.placeholder}
                maxLength={
                  field.type === "date" ? 10 : field.type === "year" ? 4 : field.type === "edition" ? 2 : undefined
                }
                disabled={
                  field.type === "author" &&
                  field.allowMultiple &&
                  !hasMoreThanThreeAuthors[field.name] &&
                  formData[field.name]?.split(";").filter((a) => a.trim()).length >= 3
                }
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-300 font-poppins
                focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none focus:shadow-xl focus:shadow-blue-500/10 focus:scale-[1.02]
                hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/5
                dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20
                ${
                  errors[field.name]
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-600"
                }
                ${
                  field.type === "author" &&
                  field.allowMultiple &&
                  !hasMoreThanThreeAuthors[field.name] &&
                  formData[field.name]?.split(";").filter((a) => a.trim()).length >= 3
                    ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                    : ""
                }`}
              />

              {field.type === "author" &&
                field.allowMultiple &&
                !hasMoreThanThreeAuthors[field.name] &&
                formData[field.name]?.split(";").filter((a) => a.trim()).length >= 3 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-poppins">
                    Limite de 3 autores atingido. Marque "Mais de 3 autores" para usar et al.
                  </p>
                )}

              {errors[field.name] && <p className="mt-1 text-sm text-red-500 font-poppins">{errors[field.name]}</p>}
            </div>
          ))}
        </div>

        {Object.keys(formData).length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 font-poppins">Visualização Prévia:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-200 font-serif leading-relaxed">
              {formatReference(selectedType, formData, fieldConfigs, hasMoreThanThreeAuthors)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-poppins">
              A visualização mostra a referência formatada. Preencha todos os campos obrigatórios para evitar mensagens
              de "[não informado]".
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={Object.keys(formData).length === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium font-poppins transition-all duration-300
          ${
            Object.keys(formData).length === 0
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:bg-blue-700 focus:shadow-xl active:translate-y-0 active:shadow-md"
          }`}
        >
          Adicionar Referência
        </button>
      </form>
    </div>
  )
}
