"use client"

import { Copy, Trash2 } from "lucide-react"
import type { Reference } from "@/app/page"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface ReferenceListProps {
  references: Reference[]
  onRemoveReference: (id: string) => void
}

export default function ReferenceList({ references, onRemoveReference }: ReferenceListProps) {
  const copyReference = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Referência copiada para a área de transferência!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      className: "font-poppins text-sm bg-ggabs-accent rounded-md shadow-lg animate-slide-in",
    })
  }

  if (references.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-lg p-8 text-center">
        <p className="text-muted-foreground font-poppins">
          Nenhuma referência adicionada ainda. Use o formulário ao lado para começar.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {references.map((reference) => (
        <div
          key={reference.id}
          className="bg-card rounded-lg shadow-lg p-4 border border-border"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-ggabs-accent uppercase tracking-wide font-poppins">
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
                className="flex items-center gap-2 px-3 py-1.5 bg-ggabs-accent hover:bg-ggabs-light text-white text-xs font-medium rounded-md transition-all duration-200 hover:shadow-md font-poppins"
                title="Copiar referência"
              >
                <Copy className="w-3 h-3" />
                Copiar
              </button>
              <button
                onClick={() => onRemoveReference(reference.id)}
                className="flex items-center gap-2 px-3 py-1.5 bg-destructive hover:bg-red-700 text-white text-xs font-medium rounded-md transition-all duration-200 hover:shadow-md font-poppins"
                title="Excluir referência"
              >
                <Trash2 className="w-3 h-3" />
                Excluir
              </button>
            </div>
          </div>

          <p className="text-sm text-foreground font-serif leading-relaxed">{reference.formatted}</p>
        </div>
      ))}
    </div>
  )
}