"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import emailjs from "@emailjs/browser"

export default function ContatoPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Inicializar EmailJS
    emailjs.init("YOUR_PUBLIC_KEY") // Substitua pela sua chave pública do EmailJS
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Limpar erro geral
    if (submitError) {
      setSubmitError("")
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Assunto deve ter pelo menos 5 caracteres"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  setIsSubmitting(true)
  setSubmitError("")

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    }

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )

    if (result.status === 200 || result.text === "OK") {
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } else {
      setSubmitError("Falha ao enviar. Tente novamente mais tarde.")
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    setSubmitError(
      "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente pelo email."
    )
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6 font-poppins"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao REF
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-poppins">
            Tem dúvidas sobre o REF? Precisa de suporte? Quer sugerir melhorias? Estamos aqui para ajudar!
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium font-poppins">Resposta em até 24h</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium font-poppins">Suporte Gratuito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-poppins">
                Informações de Contato
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 font-poppins">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-poppins">ggabstechdesign@gmail.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-poppins">Resposta em até 24 horas</p>
                  </div>
                </div>

                {/* Suporte Técnico */}
                <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 font-poppins">Suporte Técnico</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-poppins">ggabstechdesign@gmail.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-poppins">
                      Para problemas técnicos e bugs
                    </p>
                  </div>
                </div>

                {/* GGABS */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-ggabs-primary via-ggabs-secondary to-ggabs-accent rounded-xl shadow-lg text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 font-poppins">GGABS - Agência de Tecnologia e Design</h3>
                    <p className="text-white/90 font-poppins">Desenvolvedores do REF</p>
                    <a
                      href="https://ggabstechdesign.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/80 hover:text-white transition-colors font-poppins underline"
                    >
                      www.ggabstechdesign.com.br
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 font-poppins">Perguntas Frequentes</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 font-poppins">• Como usar o gerador de referências?</p>
                  <p className="text-gray-600 dark:text-gray-400 font-poppins">• Quais tipos são suportados?</p>
                  <p className="text-gray-600 dark:text-gray-400 font-poppins">
                    • O REF segue a norma ABNT atualizada?
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-poppins">• Como reportar um bug?</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-poppins">
                  Envie sua Mensagem
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-poppins">
                      Obrigado pelo contato. Responderemos em breve!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Alert */}
                    {submitError && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-400 font-poppins">{submitError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                          Nome *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-poppins transition-colors ${
                            errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Seu nome completo"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500 font-poppins">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-poppins transition-colors ${
                            errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="seu@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500 font-poppins">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-poppins transition-colors ${
                          errors.subject ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Sobre o que você gostaria de falar?"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-500 font-poppins">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                        Mensagem *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-poppins resize-none transition-colors ${
                          errors.message ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Descreva sua dúvida, sugestão ou problema..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-500 font-poppins">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold font-poppins disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  )
}
