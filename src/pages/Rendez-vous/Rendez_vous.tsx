import { MdOutlineMoreTime } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdOutlineViewQuilt } from "react-icons/md";
import { Tooltip } from "react-tooltip"
import { Link } from "react-router-dom";
import { useTheme } from "../../components/common/Theme";
import Input from "../../components/layouts/Input";
import { useDonnee } from "../../components/common/donnee";
import Swal from "sweetalert2";
import { useState } from "react";
export default function Rendez_vous()
{
  // Déclaration
  const { theme } = useTheme();
  const { meet, dispatchMeet, dispatchNotification } = useDonnee();
  const styleTableau = `w-[20%] p-3 border-x ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`;
  const [ searchTerm, setSearchTerm ] = useState("");
  // Comportement
  const handleDelete = (id:number) =>
  {
    Swal.fire({
      title: 'Clinique de Kevin',
      text: "Êtes vous sur de vouloir le supprimer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      confirmButtonColor: "#c51012",
    }).then((result)=>
    {
      if(result.isConfirmed)
      {
        dispatchMeet({
          type: "Delete",
          payload: id
        })
        Swal.fire("Clinique de Kevin", "Un rendez-vous a été supprimé", "success")
        dispatchNotification({
          type: "Ajout",
          payload: {
            id: Date.now(),
            titre: "Rendez-vous",
            message: "Un rendez-vous a été supprimer",
            type: "Suppression",
            date: new Date().toLocaleString('fr-FR')
          }
        })
      }
    })
  }

  const filteredMeeting = meet.MeetTableau.filter(m =>
    `${m.nom} ${m.prenom} ${m.medecin} ${m.status}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
  )

  // Affichage
  return(
    <div className="w-full h-full flex flex-col">

      {/* Ajouter, Recherche */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>

        {/* Ajouter un patient */}
        <Link className="flex items-center justify-start ml-5 text-4xl" to="/Rendez-vous/Ajout">
          <MdOutlineMoreTime
            data-tooltip-id="Add-tooltip"
            data-tooltip-content="Ajouter un rendez-vous"
            className="cursor-pointer hover:opacity-80 hover:scale-105 duration-100"
          />
        </Link>

        {/* Barre de recherche */}
        <div className="flex items-center w-full h-full text-xl justify-end mr-5">
          <Input
          placeholder="Rechercher ici ... "
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${theme === 'clair' ? 'bg-zinc-100': 'bg-zinc-900'}`} />
        </div>
      </div>

      {/* Listes des patients */}
      <div className="w-full h-[91.55%] overflow-auto flex flex-col p-6 gap-2">

        {/* Information patient titre */}
        <div className={`w-full h-20 flex items-center justify-between text-center font-bold text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
          <span className="w-[20%] p-3">Date</span>
          <span className={styleTableau}>Heure</span>
          <span className="w-[20%] p-3">Patient</span>
          <span className={styleTableau}>Médecin</span>
          <span className="w-[20%] p-3">Statut</span>
          <span className={`w-[20%] p-3 border-l ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' } `}>Actions</span>
        </div>

        {/* Information patient containera */}
        {filteredMeeting.map((rendez_vous)=>(
          <div key={rendez_vous.id} className={`w-full min-h-20 flex items-center justify-between text-center text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
            <span className="w-[20%] p-3">{rendez_vous.date}</span>
            <span className={styleTableau}>{rendez_vous.heure}</span>
            <span className="w-[20%] p-3">{rendez_vous.nom} {''} {rendez_vous.prenom}</span>
            <span className={styleTableau}>{rendez_vous.medecin}</span>
            <span
              className={`w-[20%] p-3
                ${rendez_vous.status === 'Annuler' ? 'text-red-600' :
                rendez_vous.status === 'Absent' ? 'text-red-600' :
                rendez_vous.status === 'Confirmer' ? 'text-blue-600' :
                rendez_vous.status === 'Terminer' ?  'text-green-600' : ''
                }
                `}>{rendez_vous.status}</span>
            <span className={`w-[20%] p-3 flex items-center justify-center border-l text-4xl space-x-4 ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`}>
              <Link to={`/Rendez-vous/Infos/${rendez_vous.id}`} className="text-green-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><MdOutlineViewQuilt data-tooltip-id="View-tooltip" data-tooltip-content="Voir ce rendez-vous" /></Link>
              <Link to={`/Rendez-vous/Edit/${rendez_vous.id}`} className="text-blue-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiEdit data-tooltip-id="Edit-tooltip" data-tooltip-content="Modifier ce rendez-vous" /></Link>
              <span className="text-red-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiTrash data-tooltip-id="Delete-tooltip" data-tooltip-content="Supprimer ce rendez-vous" onClick={() => handleDelete(rendez_vous.id)} /></span>
            </span>
          </div>
        ))}

        {filteredMeeting.length === 0 &&
        (
          <div className="flex items-center justify-center text-4xl w-full h-full ">
            <span className="text-red-500 bg-red-200 p-10 rounded-2xl border border-red-500 font-semibold">
              Aucun rendez_vous trouvé
            </span>
          </div>
        ) }

      </div>
      <Tooltip className="z-50" id="Add-tooltip" place="bottom" />
      <Tooltip className="z-50" id="View-tooltip" place="bottom" />
      <Tooltip className="z-50" id="Edit-tooltip" place="bottom" />
      <Tooltip className="z-50" id="Delete-tooltip" place="bottom" />
    </div>
  )
}