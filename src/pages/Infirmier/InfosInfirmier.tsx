import { useTheme } from "../../components/common/Theme"
import { useDonnee } from "../../components/common/donnee";
import { useParams } from "react-router-dom";

export default function InfosInfirmier()
{
  // Déclaration
  const { id } = useParams();
  const { infirmier } = useDonnee();
  const infirmiers = infirmier.find(i => i.id === Number(id))

  const { theme } = useTheme();
  const InfosInfirmiers = [
    { title: "Nom", value: infirmiers?.nom },
    { title: "Prénom", value: infirmiers?.prenom },
    { title: "Sexe", value: infirmiers?.sexe },
    { title: "Date de naissance", value: infirmiers?.dateNaissance },
  ];
  const InfoInfimierContacts = [
    { title: "Numéro téléphone", value: infirmiers?.numeroTelephone },
    { title: "Email", value: infirmiers?.email },
    { title: "Adresse", value: infirmiers?.adresse },
  ];

  const InfoInfirmierProfessions = [
    { title: "Spécialité", value: infirmiers?.specialite },
    { title: "Numéro d'ordre", value: infirmiers?.numeroOrdre },
    { title: "Années d'expérience", value: infirmiers?.experience },
    { title: "Diplôme", value: infirmiers?.diplome },
  ];

  // Affichage
  return(
    <div className="w-full h-full flex flex-col">

      {/* Header */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>
        <span className="w-full flex items-center justify-start ml-5 text-4xl space-x-2">
          <span className="font-bold">Information de l'infirmier</span>
        </span>
      </div>

      <div className="w-full h-[91.55%] flex items-center justify-center p-6 gap-2">
        <div className={`w-[80%] h-[85%] p-7 space-y-5 shadow-md overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

          {/* Info du docv */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Informations de l'infirmier</h2>
            <div className="grid grid-cols-3 gap-4">
              {InfosInfirmiers.map((InfosInfirmier, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{InfosInfirmier.title}</span>
                  <span className="text-center text-lg">{InfosInfirmier.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact du docteur */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Contact du docteur</h2>
            <div className="grid grid-cols-3 gap-4">
              {InfoInfimierContacts.map((InfoInfimierContact, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{InfoInfimierContact.title}</span>
                  <span className="text-center text-lg">{InfoInfimierContact.value}</span>
                </div>
              ))}
            </div>
          </div>

           {/* Preoffiojs */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Information professionnelle</h2>
            <div className="grid grid-cols-3 gap-4">
              {InfoInfirmierProfessions.map((InfoInfirmierProfession, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{InfoInfirmierProfession.title}</span>
                  <span className="text-center text-lg">{InfoInfirmierProfession.value}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}