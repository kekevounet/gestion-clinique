import { initialMedocReducer, initialMeetReducer, initialStateReducer } from "./donnee";
import type { PersonnelReducerState, PersonnelReducerAction, ConsultationReducer, ConsultationReducerAction, Meet, MeetReducerAction, MedocReducerAction, Medoc, NotificationState, NotificationAction, HistoriqueState, HistoriqueAction} from "./type";

export function ReducerPersonnel( state: PersonnelReducerState[], action: PersonnelReducerAction):PersonnelReducerState[]
{
  switch (action.type) {
    case 'Ajout':
      return [ ...state, action.payload]

    case 'Delete':
      return state.filter(s => s.id !== action.payload)

    case 'Update':
      return state.map(s =>
        s.id === action.payload.id ? action.payload : s
      )

    default:
      return state;
  }
}

export function ReducerConsultation( state: ConsultationReducer, action: ConsultationReducerAction ):ConsultationReducer
{
  switch( action.type )
  {
    case "Ajout":{
      const newId = Date.now() ;
      const newPatient =
      {
        ...state.consultationObjet,
        id: newId
      }

      return{
        consultationTableau: [...state.consultationTableau, newPatient],
        consultationObjet: initialStateReducer
      }
    }

    case "Delete":
      return {
        ...state,
        consultationTableau: state.consultationTableau.filter( s => s.id !== action.payload )
      }

    case "Update":
      return {
        ...state,
        consultationTableau: state.consultationTableau.map( s => s.id === state.consultationObjet.id ? state.consultationObjet : s),
        consultationObjet: initialStateReducer
      }

    case "OnChange":
    {
      const { name, value } = action.payload
      return{
        ...state,
        consultationObjet:
        {
          ...state.consultationObjet,
          [name]: value
        }
      }
    }

    case "LoadEdit":
      return{
        ...state,
        consultationObjet: action.payload
      }

    default:
      return state
  }
}

export function MeetReducer( state: Meet, action: MeetReducerAction ): Meet
{
  switch (action.type) {
    case "Ajout" :{
      const newId = Date.now();
      const newMeet =
      {
        ...state.MeetObjet,
        id: newId
      }
      return{
        MeetTableau: [ ...state.MeetTableau, newMeet],
        MeetObjet: initialMeetReducer
      }
    }

    case "Delete":
      return{
        ...state,
        MeetTableau: state.MeetTableau.filter(s => s.id !== action.payload)
      }

    case "Update":
      return{
        ...state,
        MeetTableau: state.MeetTableau.map(s => s.id === state.MeetObjet.id ? state.MeetObjet : s),
        MeetObjet: initialMeetReducer
      }

    case "LoadEdit":
      return{
        ...state,
        MeetObjet: {...action.payload}
      }

    case "Onchange":{
      const { name, value } = action.payload;
      return{
        ...state,
        MeetObjet: {
          ...state.MeetObjet,
          [name]: value
        }
      }
    }

    default:
      return state;
  }
}

export function ReducerMedoc( state: Medoc, action: MedocReducerAction ):Medoc
{
  switch ( action.type )
  {
    case "Ajout":{
      const newId = Date.now();
      const newDateAjout = new Date().toLocaleDateString('fr-FR');
      const newMedoc =
      {
        ...state.MedocObjet,
        id: newId,
        dateAjout: newDateAjout
      }
      return{
        MedocTableau: [ ...state.MedocTableau, newMedoc ],
        MedocObjet: initialMedocReducer
      }
    }

    case "Delete":
      return{
        ...state,
        MedocTableau: state.MedocTableau.filter( s => s.id !== action.payload )
      }

    case "Update":
      return{
        ...state,
        MedocTableau: state.MedocTableau.map( s => s.id === state.MedocObjet.id ? state.MedocObjet : s ),
        MedocObjet: initialMedocReducer
      }

    case "Onchange":{
      const { name, value } = action.payload
      return{
        ...state,
        MedocObjet: {
          ...state.MedocObjet,
          [name]: value
        }
      }
    }

    case "LoadEdit":
      return{
        ...state,
        MedocObjet: { ...action.payload}
      }

    default:
      return state;
  }
}

export function NotificationReducer(state: NotificationState[], action: NotificationAction): NotificationState[]
{
  switch (action.type) {
    case "Ajout":
      return [action.payload, ...state]

    case 'Delete':
      return state.filter(s => s.id !== action.payload )

    case "DeleteAll":
      return []

    default:
      return state;
  }
}

export function HistoriqueReducer(state: HistoriqueState[], action: HistoriqueAction): HistoriqueState[]
{
  switch ( action.type )
  {
    case "Ajout":
      return [ ...state, action.payload ]

    case "Delete":
      return state.filter(s => s.id !== action.payload )

    default:
      return state
  }
}