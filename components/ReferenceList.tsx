"use client"

import { Copy, Trash2 } from "lucide-react"
import type { Reference } from "@/app/page"

interface ReferenceListProps {
  references: Reference[]
  onRemoveReference: (id: string) => void
}

export default function ReferenceList({ references, onRemoveReference }: ReferenceListProps) {
  const copyReference = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (references.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma referência adicionada ainda. Use o formulário ao lado para começar.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {references.map((reference) => (
        <div
          key={reference.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {reference.type === "book" && "Livro"}
              {reference.type === "article" && "Artigo Científico"}
              {reference.type === "website" && "Site"}
              {reference.type === "chapter" && "Capítulo de Livro"}
              {reference.type === "thesis" && "Tese/Dissertação"}
              {reference.type === "interview" && "Entrevista"}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => copyReference(reference.formatted)}
                className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                title="Copiar referência"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemoveReference(reference.id)}
                className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                title="Excluir referência"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-900 dark:text-white font-serif leading-relaxed">{reference.formatted}</p>
        </div>
      ))}
    </div>
  )
}
