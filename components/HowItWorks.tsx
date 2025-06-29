import { Edit3, Plus, Copy } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Edit3 className="w-8 h-8 text-blue-600" />,
      title: "Preencha os dados",
      description: "Selecione o tipo de referência e preencha as informações necessárias",
    },
    {
      icon: <Plus className="w-8 h-8 text-blue-600" />,
      title: "Adicione a referência",
      description: "Clique em adicionar para gerar a referência no formato ABNT",
    },
    {
      icon: <Copy className="w-8 h-8 text-blue-600" />,
      title: "Copie ou exporte",
      description: "Copie referências individuais ou todas de uma vez",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 font-poppins">
          Como Funciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-500/25 dark:group-hover:shadow-blue-400/25">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-poppins transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
