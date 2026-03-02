import { useTheme } from "../../components/common/Theme"
import { useDonnee } from "../../components/common/donnee";
import { useParams } from "react-router-dom";

export default function InfosDocteur()
{
  // Déclaration
  const { theme } = useTheme();
  const { id } = useParams()
  const { docteurs } = useDonnee();

  const docteur = docteurs.find(d => d.id === Number(id))

  const InfosDocteurs = [
    { title: "Nom", value: docteur?.nom },
    { title: "Prénom", value: docteur?.prenom },
    { title: "Sexe", value: docteur?.sexe },
    { title: "Date de naissance", value: docteur?.dateNaissance },
  ];
  const InfoDocteursContact = [
    { title: "Numéro téléphone", value: docteur?.numeroTelephone },
    { title: "Email", value: docteur?.email },
    { title: "Adresse", value: docteur?.adresse },
  ];

  const InfoDocteursProfession = [
    { title: "Spécialité", value: docteur?.specialite },
    { title: "Numéro d'ordre", value: docteur?.numeroOrdre },
    { title: "Années d'expérience", value: docteur?.experience },
    { title: "Diplôme", value: docteur?.diplome },
  ];

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex flex-col">

      {/* Header */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>
        <span className="w-full flex items-center justify-start ml-5 text-3xl lg:text-4xl space-x-2">
          <span className="font-bold">Information du docteur</span>
        </span>
      </div>

      <div className="w-full h-[91.45%] flex items-center justify-center p-6 gap-2">
        <div className={`w-full lg:w-[80%] h-[85%] p-7 space-y-5 shadow-md overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

          {/* Info du docv */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Informations du docteur</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {InfosDocteurs.map((docteur, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{docteur.title}</span>
                  <span className="text-center text-lg">{docteur.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact du docteur */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Contact du docteur</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {InfoDocteursContact.map((dernièreConsultation, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{dernièreConsultation.title}</span>
                  <span className="text-center text-lg">{dernièreConsultation.value}</span>
                </div>
              ))}
            </div>
          </div>

           {/* Preoffiojs */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Information professionnelle</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {InfoDocteursProfession.map((dernièreConsultation, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{dernièreConsultation.title}</span>
                  <span className="text-center text-lg">{dernièreConsultation.value}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}