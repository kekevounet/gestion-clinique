import { useParams } from "react-router-dom";
import { useDonnee } from "../../components/common/donnee";
import { useTheme } from "../../components/common/Theme"

export default function InfosRendez_vous()
{
  // Déclaration
  const { theme } = useTheme();
  const { id } = useParams();
  const { meet } = useDonnee();
  const meetValue = meet.MeetTableau.find(m => m.id === Number(id))
  const patients = [
    { title: "Nom", value: meetValue?.nom },
    { title: "Prénom", value: meetValue?.prenom },
    { title: "Age", value: meetValue?.age },
    { title: "Sexe", value: meetValue?.sexe },
    { title: "Numéro de téléphones", value: meetValue?.numeroTelephone },
  ];
  const InfosRendez_vous = [
    { title: "Date", value: meetValue?.date },
    { title: "Heure", value: meetValue?.heure },
    { title: "Médecin", value: meetValue?.medecin },
    { title: "Status", value: meetValue?.status },
  ];

  // Affichage
  return(
    <div className="w-full h-full flex flex-col">

      {/* Header */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>
        <span className="w-full flex items-center justify-start ml-5 text-4xl space-x-2">
          <span className="font-bold">Inforation du rendez-vous</span>
        </span>
      </div>

      <div className="w-full h-[91.55%] overflow-auto flex items-center justify-center p-6 gap-2">
        <div className={`w-[80%] max-h-[85%] p-7 space-y-5 shadow-md ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

          {/* Dernière consultation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Informations du patient</h2>
            <div className="grid grid-cols-3 gap-4">
              {patients.map((patients, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{patients.title}</span>
                  <span className="text-center text-lg">{patients.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dernière consultation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Dernière Consultation</h2>
            <div className="grid grid-cols-3 gap-4">
              {InfosRendez_vous.map((infos, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{infos.title}</span>
                  <span className="text-center text-lg">{infos.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}