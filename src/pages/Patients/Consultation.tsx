import { useTheme } from "../../components/common/Theme"
import Input from "../../components/layouts/Input";
import { TextArea } from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import type { ConsultationReducerState } from "../../components/common/type";
import { InputCheck } from "../../components/layouts/Input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Consultation()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { patients, dispatchPatients, dispatchNotification, dispatchHistorique, parametre } = useDonnee();
  const navigate = useNavigate();

  const InfosPatients = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "Prénom", type: "text", name: "prenom" },
    { field: "Âge", type: "number", name: "age" },
    { field: "Sexe", type: "text", name: "sexe" },
    { field: "Groupe sanguin", type: "text", name: "groupeSanguin" },
    { field: "Numéro téléphone", type: "tel", name: "numeroTelephone" },
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
    { field: "Maladie observés", type: "text", name: "symptomeObserve" },
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

  // Comportement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value, checked, type } = e.target;
    let finalValue: any = value;

    if (type === 'checkbox') finalValue = checked;
    if ( type === 'number') finalValue = Number(value);
    if ( type === "text" ) finalValue = value;
    if ( type === "radio") finalValue = value

    dispatchPatients({
      type: "OnChange",
      payload: { name, value: finalValue }
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
    const { nom, prenom, symptomeObserve } = patients.consultationObjet;
    dispatchPatients({
      type: "Ajout"
    });
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Patient",
        message: `Un patient au nom de ${nom} ${prenom} qui est atteinte de ${symptomeObserve} a bien été enregistrer avec succès`,
        type: 'Ajout',
        date: new Date().toLocaleString('fr-FR')
      }
    })
    Swal.fire(`${parametre.nomEtablissement}`, "Patient ajouté avec succès", "success");
    navigate('/Patients');
    dispatchHistorique({
      type: "Ajout",
      payload: {
        id: Date.now(),
        type: "Consultation",
        nom: `${nom} ${prenom}`,
        info: `${symptomeObserve}`,
        date: new Date().toLocaleString()
      }
    })
  }



  // Affichage
  return(
    <div className="w-full h-full flex py-[10%] lg:py-[0%] items-center justify-center">
      <form onSubmit={handleSubmit} className={` w-[90%] lg:w-[80%] lg:h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

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
                value={String(patients.consultationObjet[patient.name as keyof ConsultationReducerState])}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information Consultation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du consultation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfosConsultations.map((consultation, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{consultation.field}</label>
              <Input
                placeholder={consultation.field}
                type={consultation.type}
                name={consultation.name}
                onChange={handleChange}
                value={String(patients.consultationObjet[consultation.name as keyof ConsultationReducerState])}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information examen / signes vitaux */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations signes vitaux</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfosSignesVitaux.map((signesVitaux, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{signesVitaux.field}</label>
              <Input
                placeholder={signesVitaux.field}
                type={signesVitaux.type}
                name={signesVitaux.name}
                onChange={handleChange}
                value={String(patients.consultationObjet[signesVitaux.name as keyof ConsultationReducerState])}
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
            name="diagnostics"
            onChange={handleChangeArea}
            value={patients.consultationObjet.diagnostics}
          />
        </div>
      </section>

      {/* Prescription */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Prescription</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfosPrescription.map((Prescription, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{Prescription.field}</label>
              <Input
                placeholder={Prescription.field}
                type={Prescription.type}
                name={Prescription.name}
                onChange={handleChange}
                value={String(patients.consultationObjet[Prescription.name as keyof ConsultationReducerState])}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Examens demandés */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Examens demandés</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {InfosExamens.map((examen, index) => (
            <div key={index} className="flex flex-row items-center space-x-3">
              <label className="mb-1 font-medium">{examen.field}</label>
              <InputCheck
                placeholder={examen.field}
                type={examen.type}
                name={examen.name}
                onChange={handleChange}
                checked={(patients.consultationObjet[examen.name as keyof ConsultationReducerState] as boolean) ?? false}
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
            name="notesMedecin"
            onChange={handleChangeArea}
            value={patients.consultationObjet.notesMedecin}
          />
        </div>
      </section>

      {/* Décision Finale */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Décision Finale</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {InfosDécisions.map((decision, index) => (
            <div key={index} className="flex items-center gap-2">
              <InputCheck
                type="radio"
                name={decision.name}
                className="w-4 h-4"
                onChange={handleChange}
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
        value="Enregistrer"
      />

      </form>
    </div>
  )
}