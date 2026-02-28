import { createContext, useContext, useReducer, useState } from "react";
import type { ConsultationReducer, ConsultationReducerState, DonneeType, Medoc, Meet, parametreType } from "./type";
import { ReducerPersonnel, ReducerConsultation, MeetReducer, ReducerMedoc, NotificationReducer, HistoriqueReducer } from "./Reducer";

const DonneeContext = createContext<DonneeType | null>(null);

export const initialStateReducer: ConsultationReducerState =
{
  id: 0,
  nom: "",
  prenom: "",
  age: 0,
  sexe: "",
  groupeSanguin: "",
  numeroTelephone: "",
  date: "",
  heure: "",
  medecin: "",
  motifConsultation: "",
  allergies: "",
  dureeSymptome: "",
  temperature: 0,
  tension: 0,
  poids: 0,
  frequenceCardiaque: 0,
  taille: 0,
  symptomeObserve: "",
  diagnostics: "",
  medicament1: "",
  medicament2: "",
  medicamentAutre: "",
  analyseSanguine: false,
  scanner: false,
  radio: false,
  analyseAutre: false,
  notesMedecin: "",
  decisionFinale: "",
}

export const initialMeetReducer =
{
  id: 0,
  nom: "",
  prenom: "",
  age: 0,
  sexe: "",
  numeroTelephone: "",
  date: "",
  heure: "",
  medecin: "",
  status: ""
}

export const initialMedocReducer =
{
  id: 0,
  nom: "",
  quantite: 0,
  dateAjout: "",
  dateExpiration: ""
}

export function DonneeProvider({ children }: { children : React.ReactNode})
{
  // Déclaration
  const [ parametre, setParametre ] = useState<parametreType>(
    {
      nomEtablissement: "Gestion de clinique",
      adresse: "IAG 05 J Itaosy",
      numeroPrincipal: "0389423351",
      emailOfficiel: "niavo.kevin9@gmail.com",
      couleur: "#10b981",
      nombreChambre: 30
    });



  const initialState: ConsultationReducer =
  {
    consultationTableau: [],
    consultationObjet: initialStateReducer
  }

  const initialStateMeet: Meet =
  {
    MeetTableau: [],
    MeetObjet: initialMeetReducer,
  }

  const initialStateMedoc: Medoc=
  {
    MedocTableau: [],
    MedocObjet: initialMedocReducer
  }


  // Personnel
  const [ docteurs, setDocteurs ] = useReducer(ReducerPersonnel, []);
  const [ infirmier, setInfirmier ] = useReducer(ReducerPersonnel, []);
  const [ administratif, setAdministratif ] = useReducer(ReducerPersonnel, []);
  // Patient
  const [ patients, dispatchPatients ] = useReducer(ReducerConsultation, initialState);
  // Rendez-vous
  const [ meet, dispatchMeet ] = useReducer(MeetReducer, initialStateMeet);
  // Médicament
  const [ medoc, dispatchMedoc ] = useReducer(ReducerMedoc, initialStateMedoc)
  // Notification
  const [ notification, dispatchNotification ] = useReducer(NotificationReducer, [])
  // Historique
  const [ historique, dispatchHistorique ] = useReducer(HistoriqueReducer, [])


  // Patient

  const value =
  {
    parametre,
    setParametre,
    docteurs,
    setDocteurs,
    infirmier,
    setInfirmier,
    administratif,
    setAdministratif,
    patients,
    dispatchPatients,
    meet,
    dispatchMeet,
    medoc,
    dispatchMedoc,
    notification,
    dispatchNotification,
    historique,
    dispatchHistorique,
  }

  // Affichage
  return(
    <DonneeContext.Provider value={ value }>
      { children }
    </DonneeContext.Provider>
  )
}

export function useDonnee()
{
  const context = useContext(DonneeContext);
  if(!context)
  {
    throw new Error("Cette donnée doit être dans un context");
  }
  return context;
}