import { useTheme } from "../../components/common/Theme"
import Input, { InputCheck } from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import type { MeetState } from "../../components/common/type";
import Swal from "sweetalert2";

export default function EditRendez_vous()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { meet, dispatchMeet, dispatchNotification, parametre } = useDonnee();
  const navigate = useNavigate();
  const { id } = useParams();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { value, name, type } = e.target;
    let newValue: any = value;
    if ( type === "number" ) newValue = Number(value)
    if ( type === "radio" ) newValue = value
    if ( type === "text" ) newValue = value
    dispatchMeet({
      type: "Onchange",
      payload: { name, value: newValue }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    dispatchMeet({
      type: "Update",
    });
    Swal.fire(`${parametre.nomEtablissement}`, "Modification réussie", "success");
    navigate('/Rendez-vous');
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Rendez-vous",
        message: "Un rendez-vous a été modifié",
        type: "Modification",
        date: new Date().toLocaleString('fr-FR')
      }
    })
  }

  // Comportement
  useEffect(()=>
  {
  const meetValue = meet.MeetTableau.find(m => m.id === Number(id) )
    if (meetValue)
    {
      dispatchMeet({
        type: "LoadEdit",
        payload: meetValue
      })
    }
  }, [id])

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex py-[10%] lg:py-[0%] items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[90%] lg:w-[80%] h-full lg:max-h-[65%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

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
                value={String(meet.MeetObjet[patient.name as keyof MeetState ?? ''])}
                name={patient.name}
                onChange={handleChange}
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
                value={String(meet.MeetObjet[Ajout.name as keyof MeetState ?? ''])}
                name={Ajout.name}
                onChange={handleChange}
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
        value="Modifier"
      />

      </form>
    </div>
  )
}