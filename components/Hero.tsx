"use client"

import { ArrowDown, BookOpen, FileText, Users, CheckCircle, Sparkles } from "lucide-react"

export default function Hero() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo - Conte��do */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4 font-poppins">
              Gerador de Referências ABNT
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-poppins">
              Crie referências rápidas e precisas no formato ABNT. Ideal para estudantes, professores e pesquisadores.
            </p>

            {/* Features rápidas */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium font-poppins">NBR 6023:2018</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium font-poppins">6 Tipos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium font-poppins">Gratuito</span>
              </div>
            </div>

            <button
              onClick={scrollToGenerator}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-poppins"
            >
              Comece Agora
              <ArrowDown className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Lado Direito - Ilustração */}
          <div className="relative">
            <div className="relative z-10">
              {/* Ilustração Principal */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Header da ilustração */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white font-poppins">Referências Geradas</h3>
                </div>

                {/* Simulação de referências */}
                <div className="space-y-4">
                  {/* Referência 1 - Livro */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 font-poppins">LIVRO</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
                      SILVA, João. <em>Metodologia Científica</em>. São Paulo: Editora Acadêmica, 2023.
                    </p>
                  </div>

                  {/* Referência 2 - Artigo */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400 font-poppins">
                        ARTIGO
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
                      SANTOS, Maria. Inovação em pesquisa. <em>Revista Científica</em>, v. 15, n. 2, p. 45-60, 2023.
                    </p>
                  </div>

                  {/* Referência 3 - Site */}
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400 font-poppins">
                        SITE
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
                      <em>Portal Acadêmico</em>. Disponível em: https://exemplo.com. Acesso em: 15 dez. 2024.
                    </p>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-poppins">6</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-poppins">Tipos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 font-poppins">100%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-poppins">ABNT</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 font-poppins">∞</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-poppins">Gratuito</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-green-200/30 dark:bg-green-800/30 rounded-full blur-xl"></div>

            {/* Ícones flutuantes */}
            <div className="absolute -top-6 left-8 animate-bounce">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute top-16 -right-6 animate-bounce" style={{ animationDelay: "0.5s" }}>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-16 animate-bounce" style={{ animationDelay: "1s" }}>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute top-8 left-1/2 animate-pulse">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
