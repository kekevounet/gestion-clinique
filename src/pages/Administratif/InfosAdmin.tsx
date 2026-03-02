import { useParams } from "react-router-dom";
import { useTheme } from "../../components/common/Theme"
import { useDonnee } from "../../components/common/donnee";

export default function InfosAdmin()
{
  // Déclaration
  const { theme } = useTheme();
  const { id } = useParams();
  const { administratif } = useDonnee();
  const admin = administratif.find(a => a.id === Number(id))
  const InfosAdministratif = [
    { title: "Nom", value: admin?.nom },
    { title: "Prénom", value: admin?.prenom },
    { title: "Sexe", value: admin?.sexe },
    { title: "Date de naissance", value: admin?.dateNaissance },
  ];
  const InfoAdministratifContact = [
    { title: "Numéro téléphone", value: admin?.numeroTelephone },
    { title: "Email", value: admin?.email },
    { title: "Adresse", value: admin?.adresse },
  ];

  const InfoAdministratifProfession = [
    { title: "Spécialité", value: admin?.specialite },
    { title: "Numéro d'ordre", value: admin?.numeroOrdre },
    { title: "Années d'expérience", value: admin?.experience },
    { title: "Diplôme", value: admin?.diplome },
  ];

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex flex-col">

      {/* Header */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>
        <span className="w-full flex items-center justify-start ml-5 text-xl lg:text-4xl space-x-2">
          <span className="font-bold">Information de l'administrateur</span>
        </span>
      </div>

      <div className="w-full h-[91.55%] flex items-center justify-center p-6 gap-2">
        <div className={`w-full lg:w-[80%] h-[85%] p-7 space-y-5 shadow-md overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

          {/* Info du docv */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Informations de l'infirmier</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {InfosAdministratif.map((admin, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{admin.title}</span>
                  <span className="text-center text-lg">{admin.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact du docteur */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Contact du docteur</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {InfoAdministratifContact.map((admin, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{admin.title}</span>
                  <span className="text-center text-lg">{admin.value}</span>
                </div>
              ))}
            </div>
          </div>

           {/* Preoffiojs */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Information professionnelle</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {InfoAdministratifProfession.map((Admin, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{Admin.title}</span>
                  <span className="text-center text-lg">{Admin.value}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
