
export type ThemeType =
{
  theme: string,
  toggleTheme: () => void ,
}

export type InputType =
{
  value?: number | string,
  placeholder: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  className?: string,
  name?: string,
}

export type InputCheckType =
{
  value?: number | string,
  checked?: boolean,
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  className?: string,
  name?: string,
}

export type TextareaType =
{
  value?: string,
  name?: string,
  placeholder: string,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export type ButtonType =
{
  value?: string,
  type: string,
  className?: string,
  onClick?: () => void,
}

// Paramètre
export type DonneeType =
{
  parametre: parametreType,
  setParametre: React.Dispatch<React.SetStateAction<parametreType>> ,
  docteurs: PersonnelReducerState[],
  setDocteurs: React.Dispatch<PersonnelReducerAction>
  infirmier: PersonnelReducerState[],
  setInfirmier: React.Dispatch<PersonnelReducerAction>
  administratif: PersonnelReducerState[],
  setAdministratif: React.Dispatch<PersonnelReducerAction>
  patients: ConsultationReducer,
  dispatchPatients: React.Dispatch<ConsultationReducerAction>
  meet: Meet,
  dispatchMeet: React.Dispatch<MeetReducerAction>
  medoc: Medoc
  dispatchMedoc: React.Dispatch<MedocReducerAction>
  notification: NotificationState[],
  dispatchNotification: React.Dispatch<NotificationAction>
  historique: HistoriqueState[],
  dispatchHistorique: React.Dispatch<HistoriqueAction>
}

export type parametreType =
{
  nomEtablissement: string,
  adresse: string,
  numeroPrincipal: string,
  emailOfficiel: string,
  couleur: string,
  nombreChambre: number,
}

// PersonnelReducer
export type PersonnelReducerState =
{
  id: number,
  nom: string,
  prenom: string,
  sexe: string,
  dateNaissance: string,
  numeroTelephone: string,
  email: string,
  adresse: string,
  specialite: string,
  numeroOrdre: string,
  experience: string,
  diplome: string,
}

export type PersonnelReducerAction =
  | { type: "Ajout", payload: PersonnelReducerState }
  | { type: "Delete", payload: number }
  | { type: "Update", payload: PersonnelReducerState}

export type ConsultationReducerState =
  {
    id: number,
    nom: string,
    prenom: string,
    age: number,
    sexe: string,
    groupeSanguin: string,
    numeroTelephone: string,
    date: string,
    heure: string,
    medecin: string,
    motifConsultation: string,
    allergies: string,
    dureeSymptome: string,
    temperature: number,
    tension: number,
    poids: number,
    frequenceCardiaque: number,
    taille: number,
    symptomeObserve: string,
    diagnostics: string,
    medicament1: string,
    medicament2: string,
    medicamentAutre: string,
    analyseSanguine: boolean,
    scanner: boolean,
    radio: boolean,
    analyseAutre: boolean,
    notesMedecin: string,
    decisionFinale: string,
  }

export type ConsultationReducer =
{
  consultationTableau: ConsultationReducerState[];
  consultationObjet: ConsultationReducerState;
}

export type ConsultationReducerAction =
  | { type: "Ajout" }
  | { type: "Delete", payload: number }
  | { type: "Update" }
  | { type: "OnChange", payload: { name: string, value: any} }
  | { type: "LoadEdit", payload: ConsultationReducerState }

export type MeetState =
{
  id: number,
  nom: string,
  prenom: string,
  age: number,
  sexe: string,
  numeroTelephone: string,
  date: string,
  heure: string,
  medecin: string,
  status: string,
}

export type Meet =
{
  MeetTableau: MeetState[],
  MeetObjet: MeetState,
}

export type MeetReducerAction =
  | { type: "Ajout" }
  | { type: "Delete", payload: number }
  | { type: "Update" }
  | { type: "Onchange", payload: { name: string, value: any } }
  | { type: "LoadEdit", payload: MeetState }

export type MedocState =
{
  id: number,
  nom: string,
  quantite: number,
  dateAjout: string,
  dateExpiration: string,
}

export type MedocReducerAction =
  | { type: "Ajout" }
  | { type: "Delete", payload: number }
  | { type: "Update" }
  | { type: "Onchange", payload: { name: string, value: any } }
  | { type: "LoadEdit", payload: MedocState }

export type Medoc =
{
  MedocObjet: MedocState
  MedocTableau: MedocState[]
}

export type NotificationState =
{
  id: number,
  titre: string,
  message: string,
  type: "Ajout" | "Suppression" | "Modification"
  date: string,
}

export type NotificationAction =
  | { type: "Ajout", payload: NotificationState }
  | { type: "Delete", payload: number }
  | { type: "DeleteAll" }

export type HistoriqueState =
{
  id: number,
  type: 'Consultation' | 'Rendez-vous' | 'Docteur' | 'Docteur' | 'Infirmier' | 'Administrateur' | 'Médicament',
  nom: string,
  info: string,
  date: string,
}

export type HistoriqueAction =
  | { type: "Ajout", payload: HistoriqueState }
  | { type: "Delete", payload: number }