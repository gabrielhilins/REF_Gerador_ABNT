"use client";

import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import GGABSCard from "./GGABSCard";

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
                  href="https://github.com/gabrielhilins/REF_Gerador_ABNT"
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
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-poppins"
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
            <GGABSCard />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-poppins">
                © {new Date().getFullYear()} GGABS TECH & DESIGN. Todos os
                direitos reservados.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-poppins">
              <span>Versão 1.0.0</span>
              <span>•</span>
              <span>Última atualização: Janeiro 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-ggabs-primary via-ggabs-accent to-ggabs-light"></div>
    </footer>
  );
}
