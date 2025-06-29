import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "REF - Gerador de Referências ABNT",
  description:
    "Gerador de referências ABNT moderno e intuitivo. Crie referências rápidas e precisas no formato ABNT para estudantes, professores e pesquisadores.",
  keywords: ["ABNT", "referências", "bibliografia", "citações", "acadêmico", "NBR 6023"],
  authors: [{ name: "GGABS", url: "https://ggabstechdesign.com.br" }],
  creator: "GGABS",
  publisher: "GGABS",
  icons: {
    icon: [
      { url: "/Icone Azul.png", sizes: "16x16", type: "image/png" },
      { url: "/Icone Azul.png", sizes: "32x32", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <head>
        <link
          rel="icon"
          href="/Icone Azul.png"
        />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
