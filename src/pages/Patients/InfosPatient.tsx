import { useTheme } from "../../components/common/Theme"
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import { Link, useParams } from "react-router-dom";

export default function InfosPatient()
{
  // Déclaration
  const { theme } = useTheme();
  const { id } = useParams();
  const { patients } = useDonnee();
  const patient = patients.consultationTableau.find(p => p.id === Number(id))
  const patientsInfos = [
    { title: "Nom", value: patient?.nom },
    { title: "Age", value: patient?.age },
    { title: "Téléphone", value: patient?.numeroTelephone },
    { title: "Groupe Sanguin", value: patient?.groupeSanguin },
    { title: "Allergies", value: patient?.allergies },
    { title: "Maladies", value: patient?.symptomeObserve },
  ];
  const dernièreConsultations = [
    { title: "Date", value: patient?.date },
    { title: "Diagnostic", value: patient?.diagnostics },
    { title: "Médecin", value: patient?.medecin },
    { title: "Tension", value: patient?.tension },
    { title: "Poids", value: patient?.poids },
    { title: "Température", value: patient?.temperature },
  ];

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex flex-col">

      {/* Header */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>
        <span className="w-full flex items-center justify-start ml-5 text-3xl lg:text-4xl space-x-2">
          <span className="font-bold">Information du patient</span>
        </span>
      </div>

      <div className="w-full h-[91.55%] overflow-auto flex items-center justify-center p-6 gap-2">
        <div className={`w-full lg:w-[80%] overflow-auto max-h-[85%] p-7 space-y-5 shadow-md ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

          {/* Dernière consultation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Informations du patient</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {patientsInfos.map((patients, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 overflow-auto ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{patients.title}</span>
                  <span className="text-center text-lg">{patients.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dernière consultation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-3">Dernière Consultation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {dernièreConsultations.map((dernièreConsultation, index) => (
                <div key={index} className={`flex flex-col space-y-4 p-5 overflow-auto ${theme === 'clair' ? 'bg-zinc-200' : 'bg-zinc-800' }`}>
                  <span className="mb-1 font-medium text-center">{dernièreConsultation.title}</span>
                  <span className="text-center text-lg">{dernièreConsultation.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton */}
          <div className=" flex flex-col lg:flex-row gap-6 items-center">

            <Link to='/Historique' className="w-full lg:w-1/4">
              <Button type="button" value="Voir historique" className={theme === 'clair' ? 'bg-green-400' : 'bg-green-900' } />
            </Link>
            <Link to='/Consultation' className="w-full lg:w-1/4">
              <Button type="button" value="Nouvelle consultation" className={theme === 'clair' ? 'bg-blue-400' : 'bg-blue-900' } />
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}