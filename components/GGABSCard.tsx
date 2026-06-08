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
        <div className="mb-4">
          <img src="/Wordmark Branco GGABS.png" alt="GGABS" className="h-10 w-auto object-contain mb-1" />
          <p className="text-white/80 text-sm font-medium font-poppins">Agência de tecnologia e design</p>
        </div>

        <p className="text-white/90 text-justify text-xs mb-4 leading-relaxed font-poppins">
          Especialistas em desenvolvimento de sites de alta performance e identidade visual estratégica. 
          Construímos marcas exclusivas e páginas estruturadas para transformar visitantes em clientes.
        </p>

        <p className="text-white/90 text-justify text-xs mb-4 leading-relaxed font-poppins">
          De Recife para todo o Brasil, criamos projetos sob medida sem templates genéricos, focando em velocidade 
          excepcional e otimização para conversão.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Alta Performance Web</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Design Exclusivo</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Soluções Sob Medida</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-xs text-white/90 font-medium font-poppins">Foco em Conversão</span>
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
