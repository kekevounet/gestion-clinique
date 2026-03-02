import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
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

function useLocalStorage<S, A>(
    reducer: React.Reducer<S, A>,
    key: string,
    initialState: S
  )
{
  const initializer = () =>
  {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialState
  }
  const [ state, dispatch ] = useReducer(reducer, initialState, initializer)

  useEffect(() =>
  {
    localStorage.setItem(key, JSON.stringify(state))
  }, [ state, dispatch])
  return [ state, dispatch ] as const
}

export function DonneeProvider({ children }: { children : React.ReactNode})
{
  // Déclaration
  const [ parametre, setParametre ] = useState<parametreType>(() =>
  {
    const savedParametre = localStorage.getItem('parametre')
    return savedParametre ? JSON.parse(savedParametre) :
    {
      nomEtablissement: "Gestion de clinique",
      adresse: "IAG 05 J Itaosy",
      numeroPrincipal: "0389423351",
      emailOfficiel: "niavo.kevin9@gmail.com",
      couleur: "#10b981",
      nombreChambre: 30
    }
  })

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
  const [ docteurs, setDocteurs ] = useLocalStorage(ReducerPersonnel,"docteurs", []);
  const [ infirmier, setInfirmier ] = useLocalStorage(ReducerPersonnel,"infirmier",  []);
  const [ administratif, setAdministratif ] = useLocalStorage(ReducerPersonnel,"administratif", []);
  // Patient
  const [ patients, dispatchPatients ] = useLocalStorage(ReducerConsultation, "patients", initialState);
  // Rendez-vous
  const [ meet, dispatchMeet ] = useLocalStorage(MeetReducer,'rendez-vous' , initialStateMeet);
  // Médicament
  const [ medoc, dispatchMedoc ] = useLocalStorage(ReducerMedoc, "medicament",  initialStateMedoc)
  // Notification
  const [ notification, dispatchNotification ] = useLocalStorage(NotificationReducer, "notification", [])
  // Historique
  const [ historique, dispatchHistorique ] = useLocalStorage(HistoriqueReducer, "historique", []);


  // Patient

  const value = useMemo(() =>(
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
  }),[
    parametre,
    docteurs,
    infirmier,
    administratif,
    patients,
    meet,
    medoc,
    notification,
    historique
  ]);

  useEffect(() =>
  {
    localStorage.setItem('parametre', JSON.stringify(parametre))
  }, [parametre])

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