import { useTheme } from "../../components/common/Theme"
import Input, { InputCheck } from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import type { MeetState } from "../../components/common/type";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AjoutRendez_vous()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { meet, dispatchMeet } = useDonnee();
  const navigate = useNavigate();
  const { dispatchNotification, dispatchHistorique, parametre } = useDonnee();
  const InfosPatients = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "Prénom", type: "text", name: "prenom" },
    { field: "Âge", type: "number", name: "age" },
    { field: "Sexe", type: "text", name: "sexe" },
    { field: "Numéro téléphones", type: "tel", name: "numeroTelephone" },
  ];
  const AjoutRendez_vous = [
    { field: "Date", type: "date", name: "date" },
    { field: "Heure", type: "time", name: "heure" },
    { field: "Médecin", type: "text", name: "medecin" },
  ];
  const StatusRendez_vous = [
    { field: "Absent", type: "radio", name: "status" },
    { field: "Annuler", type: "radio", name: "status" },
    { field: "Confirmer", type: "radio", name: "status" },
    { field: "Terminer", type: "radio", name: "status" },
  ];

  // COmportement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value, type } = e.target;
    let newValue: any = value
    if (type === 'radio') newValue = value
    if ( type === "number") newValue = Number(value)
    if ( type === "text") newValue = value
    dispatchMeet({
      type: "Onchange",
      payload: { name, value: newValue }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    const { nom, prenom, date, heure, medecin } = meet.MeetObjet;
    dispatchMeet({
      type: "Ajout"
    });
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Rendez-vous",
        message: `Un rendez-vous avec ${nom} ${prenom} a été prévu le ${date} à ${heure} avec le docteur ${medecin}`,
        type: "Ajout",
        date: new Date().toLocaleString('fr-FR')
      }
    })
    dispatchHistorique({
      type: "Ajout",
      payload: {
        id: Date.now(),
        type: "Rendez-vous",
        nom: `${nom} ${prenom}`,
        info: `Le ${date} à ${heure} avec ${medecin}`,
        date: new Date().toLocaleString(),
      }
    })
    Swal.fire(`${parametre.nomEtablissement}`, "Rendez-vous ajouté avec succès", "success");
    navigate('/Rendez-vous');
  }


  // Affichage
  return(
    <div className="w-full lg:h-full h-screen flex py-[10%] lg:py-[0%] items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[90%] lg:w-[80%] max-h-full p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

      {/* Information patient */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du patient</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfosPatients.map((patient, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{patient.field}</label>
              <Input
                placeholder={patient.field}
                type={patient.type}
                name={patient.name}
                onChange={handleChange}
                value={String(meet.MeetObjet[patient.name as keyof MeetState])}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information Consultation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du rendez-vous</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {AjoutRendez_vous.map((Ajout, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{Ajout.field}</label>
              <Input
                placeholder={Ajout.field}
                type={Ajout.type}
                name={Ajout.name}
                onChange={handleChange}
                value={String(meet.MeetObjet[Ajout.name as keyof MeetState])}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Status du rendez-vous</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {StatusRendez_vous.map((status, index) => (
            <div key={index} className="flex items-center gap-2">
              <InputCheck
                type="radio"
                name={status.name}
                className="w-4 h-4"
                onChange={handleChange}
                checked={ meet.MeetObjet.status === status.field}
                value={status.field}
              />
              <label>{status.field}</label>
            </div>
          ))}
        </div>
      </section>

      {/* Bouton enregisterer */}

      <Button
        type="submit"
        value="Enregistrer"
      />

      </form>
    </div>
  )
}