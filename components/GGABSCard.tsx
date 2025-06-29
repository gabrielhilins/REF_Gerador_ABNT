"use client"

import { ExternalLink, Zap, Users, Globe, Sparkles } from "lucide-react"

export default function GGABSCard() {
  return (
    <div className="bg-gradient-to-br from-ggabs-primary via-ggabs-secondary to-ggabs-light rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
      </div>

      <div className="relative z-10">
        {/* Logo GGABS */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/Icone GGABS.png" alt="Ícone GGABS" className="w-10 h-10 object-contain" />
          <div>
            <img src="/Wordmark Branco GGABS.png" alt="GGABS" className="h-10 w-auto object-contain" />
            <p className="text-white/80 text-sm font-medium font-poppins">Agência de tecnologia e design</p>
          </div>
        </div>

        <p className="text-white/90 text-justify text-xs mb-4 leading-relaxed font-poppins">
          Agência independente especializada em soluções digitais sob medida. Atuamos na interseção entre tecnologia e
          design para desenvolver experiências únicas, funcionais e visualmente impactantes.
        </p>

        <p className="text-white/90 text-justify text-xs mb-4 leading-relaxed font-poppins">
          Nosso propósito é transformar ideias em realidade com criatividade e inovação, oferecendo soluções acessíveis
          que impulsionam negócios de todos os tamanhos.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Soluções personalizadas</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Experiência do Usuário</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Responsividade</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Design Impactante</span>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://ggabstechdesign.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/30 font-poppins"
        >
          <span className="font-semibold text-sm">Conheça a GGABS</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Desenvolvido por */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-white/80 text-sm font-medium font-poppins">REF foi desenvolvido pela GGABS</p>
        </div>
      </div>
    </div>
  )
}
