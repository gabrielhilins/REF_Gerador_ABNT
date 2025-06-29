"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks"
import GeneratorForm from "@/components/GeneratorForm"
import ReferenceList from "@/components/ReferenceList"
import Footer from "@/components/Footer"
import { ArrowRight } from "lucide-react"

export interface Reference {
  id: string
  type: string
  data: Record<string, string>
  formatted: string
}

export default function App() {
  const [references, setReferences] = useState<Reference[]>([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const addReference = (reference: Reference) => {
    setReferences((prev) => [...prev, reference])
  }

  const removeReference = (id: string) => {
    setReferences((prev) => prev.filter((ref) => ref.id !== id))
  }

  const copyAllReferences = () => {
    const allReferences = references.map((ref) => ref.formatted).join("\n\n")
    navigator.clipboard.writeText(allReferences)
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <HowItWorks />

        <section id="generator" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Coluna do Formulário */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-poppins">
                Gerador de Referências
              </h2>
              <GeneratorForm onAddReference={addReference} />
            </div>

            {/* Ícone de Seta - Visível apenas em telas grandes */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border-2 border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Coluna da Lista */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                  Suas Referências ({references.length})
                </h2>
                {references.length > 0 && (
                  <button
                    onClick={copyAllReferences}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-poppins"
                  >
                    Copiar Todas
                  </button>
                )}
              </div>
              <ReferenceList references={references} onRemoveReference={removeReference} />
            </div>
          </div>
        </section>

        <Footer darkMode={darkMode} />
      </div>
    </>
  )
}
