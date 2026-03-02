import { useState } from "react"
import { useTheme } from "../components/common/Theme"

export default function Support()
{
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "C'est quoi cette application ?",
      answer: "C'est une application web qui gère en quelques sortes les cliniques, hopitals, etc... Pour faciliter la gestion de leur établissement."
    },
    {
      question: "Pourquoi je rencontre un bug d'affichage ?",
      answer: "Vérifiez que votre navigateur est à jour. Vous pouvez également vider le cache et recharger la page."
    },
    {
      question: "Mes données seront où?",
      answer: "Cette application n'a pas de back-end, mais vos données seront stocké dans le navigateur. Même si vous fermez ou éteindre votre machine. Tant que les donnée sont dans la navigateur, alors il le seront toujours"
    },
    {
      question:"Comment la chambre a été répartie ?",
      answer: "Dans cette logique, un chambre est dédié à un patient."
    },
    {
      question: "Donc le site web est à moi?",
      answer: "Non, mais vous pouvez travailler avec et de faire comme bon vous semble. Mais si vous voulez votre propre application web, veuillez lire la question ci dessous ."
    },
    {
      question: "Comment me contacter ou voulez-vous un site rien qu'à vous?",
      answer: "Il suffit de cliquer le mail ci-dessous et vous seriez rediriger automatiquement à votre boite de messagerie Email."
    },
    {
      question: "Quels sont les languages que vous avez utilisés pour faire cette belle app?",
      answer: "Ceci est un projet font-end qui a été fait par TypeScript, React JS, Tailwind CSS et quelques bibliothèque."
    },
  ];

  return(
    <div className="w-full h-screen lg:h-full flex flex-col p-2 overflow-auto justify-between lg:px-10">

      {/* Contenu principal */}
      <section className="w-full h-[90%] lg:p-5 flex justify-center items-center">
        <div
          className={`w-full lg:w-[70%] h-[90%] lg:h-full overflow-auto ${
            theme === 'clair'
              ? 'bg-zinc-100 text-zinc-800'
              : 'bg-zinc-900 text-zinc-100'
          } lg:p-[5%] p-[4%] shadow-xl flex flex-col justify-between`}
        >

          {/* Header */}
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Support
            </h1>

            <div className="w-20 h-0.5 bg-zinc-400 mb-12 opacity-50"></div>
          </div>

          {/* FAQ */}
          <div className="flex-1">
            <h2 className="text-3xl mb-10 cursor-pointer">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded transition cursor-pointer ${
                    theme === 'clair'
                      ? 'bg-zinc-200 shadow-sm'
                      : 'bg-zinc-900 shadow-md'
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <span className="text-lg font-medium cursor-pointer">
                      {faq.question}
                    </span>

                    <span
                      className={`text-2xl transition-transform duration-300 ${
                        openIndex === index ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? 'max-h-40 pb-6 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="opacity-70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4">
              Contact
            </h2>

            <p className="opacity-70 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>

            <a
              href="mailto:niavo.kevin9@gmail.com"
              className={`text-xl font-medium tracking-wide hover:underline ${
                theme === 'clair'
                  ? 'text-zinc-900'
                  : 'text-zinc-100'
              }`}
            >
              niavo.kevin9@gmail.com
            </a>
            <div className="py-3 text-xl">
              ou cliquer <a className="text-red-500 underline" href="https://niavo.netlify.app" target="_blank">ici</a> pour voir mon portfolio
            </div>

            <p className="text-sm opacity-50 mt-4">
              Temps de réponse estimé : 24 à 48 heures ouvrées.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <section
        className={`w-full border-t-8 h-[8%] text-2xl flex items-center justify-center ${
          theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900'
        }`}
      >
        &copy; Niavo Kevin prod 2026
      </section>

    </div>
  )
}