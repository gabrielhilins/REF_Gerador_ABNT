"use client";

import { ExternalLink, Mail, Globe, Zap, Users, Sparkles } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* REF Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={
                  darkMode
                    ? "/Logo Principal Azul Claro.png"
                    : "/Logo Principal Azul.png"
                }
                alt="REF - Gerador de Referências ABNT"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 text-justify dark:text-gray-400 mb-4 font-poppins">
              Gerador de referências ABNT moderno e intuitivo. Criado para
              facilitar a vida de estudantes, professores e pesquisadores na
              criação de referências bibliográficas precisas e padronizadas.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium font-poppins">
                ABNT NBR 6023:2018
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full font-medium font-poppins">
                Gratuito
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full font-medium font-poppins">
                Open Source
              </span>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 font-poppins">
              Links Úteis
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#generator"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-poppins"
                >
                  Gerador
                </a>
              </li>
              <li>
                <a
                  href="https://www.ufpe.br/documents/40070/1837975/ABNT+NBR+6023+2018+%281%29.pdf/3021f721-5be8-4e6d-951b-fa354dc490ed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-poppins"
                >
                  Norma ABNT 6023
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GGABSTECHDESIGN/REF_Gerador_ABNT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-poppins"
                >
                  Código Fonte
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-poppins"
                >
                  Contato e Suporte
                  <Mail className="w-3 h-3" />
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3 text-sm font-poppins">
                Tipos Suportados
              </h5>
              <div className="grid grid-cols-2 gap-1 text-xs font-poppins">
                <span className="text-gray-600 dark:text-gray-400">
                  📖 Livros
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  📝 Artigos
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  🌐 Sites
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  📑 Capítulos
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  🎓 Teses
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  🎙️ Entrevistas
                </span>
              </div>
            </div>
          </div>

          {/* GGABS Seção Destacada */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-ggabs-primary via-ggabs-secondary via-ggabs-accent to-ggabs-light rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
              </div>

              <div className="relative z-10">
                {/* Logo GGABS */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/Icone GGABS.png"
                    alt="Ícone GGABS"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <img
                      src="/Wordmark Branco GGABS.png"
                      alt="GGABS"
                      className="h-10 w-auto object-contain"
                    />
                    <p className="text-white/80 text-sm font-medium font-poppins">
                      Agência de tecnologia e design
                    </p>
                  </div>
                </div>

                <p className="text-white/90 text-justify text-xs mb-4 leading-relaxed font-poppins">
                  Agência independente especializada em soluções digitais sob
                  medida. Atuamos na interseção entre tecnologia e design para
                  desenvolver experiências únicas, funcionais e visualmente
                  impactantes.
                </p>

                <p className="text-white/90 text-justify text-xs mb-4 leading-relaxed font-poppins">
                  Nosso propósito é transformar ideias em realidade com
                  criatividade e inovação, oferecendo soluções acessíveis que
                  impulsionam negócios de todos os tamanhos.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs text-white/90 font-medium font-poppins">
                      Soluções personalizadas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-300" />
                    <span className="text-xs text-white/90 font-medium font-poppins">
                      Experiência do Usuário
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-300" />
                    <span className="text-xs text-white/90 font-medium font-poppins">
                      Responsividade
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span className="text-xs text-white/90 font-medium font-poppins">
                      Design Impactante
                    </span>
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
                  <p className="text-white/80 text-sm font-medium font-poppins">
                    REF foi desenvolvido pela GGABS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-poppins">
                © 2024 REF - Gerador de Referências ABNT. GGABS TECH & DESIGN.
                Todos os direitos reservados.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-poppins">
              <span>Versão 1.0.0</span>
              <span>•</span>
              <span>Última atualização: Junho 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-ggabs-primary via-ggabs-accent to-ggabs-light"></div>
    </footer>
  );
}
