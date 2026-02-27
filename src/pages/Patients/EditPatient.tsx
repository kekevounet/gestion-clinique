import { useTheme } from "../../components/common/Theme"
import Input, { InputCheck } from "../../components/layouts/Input";
import { TextArea } from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import { useNavigate, useParams } from "react-router-dom";
import type { ConsultationReducerState } from "../../components/common/type";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function EditPatient()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { patients, dispatchPatients, dispatchNotification } = useDonnee();
  const { id } = useParams();
  const navigate = useNavigate();

  const InfosPatients = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "Prénom", type: "text", name: "prenom" },
    { field: "Âge", type: "number", name: "age" },
    { field: "Sexe", type: "text", name: "sexe" },
    { field: "Groupe sanguin", type: "text", name: "groupeSanguin" },
    { field: "Numéro téléphones", type: "tel", name: "numeroTelephone" },
  ];
  const InfosConsultations = [
    { field: "Date", type: "date", name: "date" },
    { field: "Heure", type: "time", name: "heure" },
    { field: "Médecin", type: "text", name: "medecin" },
    { field: "Motif de consultation", type: "text", name: "motifConsultation" },
    { field: "Allergies", type: "text", name: "allergies" },
    { field: "Durée des symptômes", type: "text", name: "dureeSymptome" },
  ];
  const InfosSignesVitaux = [
    { field: "Température", type: "number", name: "temperature" },
    { field: "Tension", type: "number", name: "tension" },
    { field: "Poids", type: "number", name: "poids" },
    { field: "Fréquence cardiaque", type: "number", name: "frequenceCardiaque" },
    { field: "Taille", type: "number", name: "taille" },
    { field: "Symptômes observés", type: "text", name: "symptomeObserve" },
  ];
  const InfosPrescription = [
    { field: "Médicament 1", type: "text", name: "medicament1" },
    { field: "Médicament 2", type: "text", name: "medicament2" },
    { field: "Autres", type: "text", name: "medicamentAutre" },
  ];
  const InfosExamens = [
    { field: "Analyse sanguine", type: "checkbox", name: "analyseSanguine" },
    { field: "Scanner", type: "checkbox", name: "scanner" },
    { field: "Radio", type: "checkbox", name: "radio" },
    { field: "Autre", type: "checkbox", name: "analyseAutre" },
  ];
  const InfosDécisions = [
    { field: "Sortie simple", type: "radio", name: "decisionFinale" },
    { field: "Suivi nécessaire", type: "radio", name: "decisionFinale" },
    { field: "Hospitalisation", type: "radio", name: "decisionFinale" },
    { field: "Référence externe", type: "radio", name: "decisionFinale" },
  ];

  // Comportemetn
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value, type, checked } = e.target;
    let newValue: any = value
    if ( type === "checkbox") newValue = checked
    if ( type === "radio" ) newValue = value
    if ( type === "text" ) newValue = value
    if ( type === "number") newValue = Number(value)
    dispatchPatients({
      type: "OnChange",
      payload: { name, value: newValue }
    })
  }
  const handleChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  {
    const { name, value } = e.target;
    dispatchPatients({
      type: "OnChange",
      payload: { name, value }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    dispatchPatients({
      type: "Update"
    })
    Swal.fire("Clinique de Kevin", "Modification réussie", "success");
    navigate('/Patients');
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Patient",
        message: "Un patient a été modifier",
        type: "Modification",
        date: new Date().toLocaleString(),
      }
    })
  }

  useEffect(()=>
  {
    const patient = patients.consultationTableau.find(p => p.id === Number(id));
    if(patient)
    {
      dispatchPatients({
        type: "LoadEdit",
        payload: patient
      })
    }
  }, [ id ])

  // Affichage
  return(
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[80%] h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

      {/* Information patient */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du patient</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosPatients.map((patienta, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{patienta.field}</label>
              <Input
                placeholder={patienta.field}
                type={patienta.type}
                value={String(patients.consultationObjet[patienta.name as keyof ConsultationReducerState] ?? "" )}
                onChange={handleChange}
                name={patienta.name}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information Consultation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du consultation</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosConsultations.map((consultation, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{consultation.field}</label>
              <Input
                placeholder={consultation.field}
                type={consultation.type}
                value={String(patients.consultationObjet[consultation.name as keyof ConsultationReducerState] ?? "" )}
                onChange={handleChange}
                name={consultation.name}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information examen / signes vitaux */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations signes vitaux</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosSignesVitaux.map((signesVitaux, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{signesVitaux.field}</label>
              <Input
                placeholder={signesVitaux.field}
                type={signesVitaux.type}
                onChange={handleChange}
                name={signesVitaux.name}
                value={String(patients.consultationObjet[signesVitaux.name as keyof ConsultationReducerState] ?? "" )}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Diagnostics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Diagnostics</h2>
        <div className="grid grid-cols-3 gap-4">
          <TextArea
            placeholder="Diagnostics ..."
            value={patients.consultationObjet.diagnostics}
            onChange={handleChangeArea}
            name="diagnostics"
          />
        </div>
      </section>

      {/* Prescription */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Prescription</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosPrescription.map((Prescription, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{Prescription.field}</label>
              <Input
                placeholder={Prescription.field}
                type={Prescription.type}
                value={String(patients.consultationObjet[Prescription.name as keyof ConsultationReducerState] ?? "" )}
                onChange={handleChange}
                name={Prescription.name}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Examens demandés */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Examens demandés</h2>
        <div className="grid grid-cols-4 gap-4">
          {InfosExamens.map((examen, index) => (
            <div key={index} className="flex flex-row items-center space-x-3">
              <label className="mb-1 font-medium">{examen.field}</label>
              <InputCheck
                placeholder={examen.field}
                type={examen.type}
                onChange={handleChange}
                checked={(patients.consultationObjet[examen.name as keyof ConsultationReducerState] as boolean) ?? false}
                name={examen.name}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Nodes médecins */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Notes médecin</h2>
        <div className="grid grid-cols-3 gap-4">
          <TextArea
            placeholder="Notes médecin ..."
            value={patients.consultationObjet.notesMedecin}
            onChange={handleChangeArea}
            name="notesMedecin"
          />
        </div>
      </section>

      {/* Décision Finale */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Décision Finale</h2>
        <div className="grid grid-cols-4 gap-4">
          {InfosDécisions.map((decision, index) => (
            <div key={index} className="flex items-center gap-2">
              <InputCheck
                type={decision.type}
                className="w-4 h-4"
                onChange={handleChange}
                name={decision.name}
                value={decision.field}
                checked={patients.consultationObjet.decisionFinale === decision.field}
              />
              <label>{decision.field}</label>
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