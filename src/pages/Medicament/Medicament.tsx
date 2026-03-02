import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { useTheme } from "../../components/common/Theme";
import Input from "../../components/layouts/Input";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Tooltip } from "react-tooltip"
import { Link } from "react-router-dom";
import { useDonnee } from "../../components/common/donnee";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Medicament()
{
  // Déclaration
  const { theme } = useTheme();
  const { medoc, dispatchMedoc, dispatchNotification, parametre } = useDonnee();
  const [ searchTerm, setSearchTerm ] = useState<string>('')
  const styleTableau = `w-[20%] p-3 border-x ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`;

  // COmportement
  const handleDelete = (id:number) =>
  {
    Swal.fire({
      title: `${parametre.nomEtablissement}`,
      text: "Êtes vous sur de vouloir le supprimer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      confirmButtonColor: "#c51012",
    }).then((result)=>
    {
      if(result.isConfirmed)
      {
        dispatchMedoc({
          type: "Delete",
          payload: id
        })
        Swal.fire(`${parametre.nomEtablissement}`, "Un médicament a été supprimé", "success");
        dispatchNotification({
          type: "Ajout",
          payload: {
            id: Date.now(),
            titre: "Médicament",
            message: "Un médicament a été supprimer",
            type: "Suppression",
            date: new Date().toLocaleString()
          }
        })
      }
    })
  }

  const filteredTaleau = medoc.MedocTableau.filter(p =>
    `${p.nom} ${p.quantite} ${p.dateAjout} ${p.dateExpiration}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
  )

  const formatDate = ( isoDate?: string) =>
  {
    if(!isoDate) return "";
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`
  }

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex flex-col overflow-auto">

      {/* Ajouter, Recherche */}
      <div className={`w-[300%] lg:w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>

        {/* Ajouter un patient */}
        <Link className="flex items-center justify-start ml-5 text-4xl" to="/Medicament/Ajout">
          <AiOutlineUserAdd
            data-tooltip-id="Add-tooltip"
            data-tooltip-content="Ajouter un médicament"
            className="cursor-pointer hover:opacity-80 hover:scale-105 duration-100"
          />
        </Link>

        {/* Barre de recherche */}
        <div className="flex items-center w-full h-full text-xl justify-end mr-20 lg:mr-5">
          <Input
            placeholder="Rechercher ici ... "
            type="text"
            className={`${theme === "clair" ? 'bg-zinc-100' : 'bg-zinc-900'}`}
            value={searchTerm}
            onChange={(e) =>setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Listes des patients */}
      <div className="w-[300%] lg:w-full h-[91.45%] overflow-auto flex flex-col p-6 gap-2">

        {/* Information patient titre */}
        <div className={`w-full h-20 flex items-center justify-between text-center font-bold text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
          <span className="w-[20%] p-3">Nom</span>
          <span className={styleTableau}>Quantite</span>
          <span className="w-[20%] p-3">Date d'ajout</span>
          <span className={styleTableau}>Date d'expiration</span>
          <span className="w-[20%] p-3">Actions</span>
        </div>

        {/* Information patient containera */}
        {filteredTaleau.length === 0
          ?
            (
              <div className="flex items-center justify-center text-4xl w-full h-full ">
                <span className="text-red-500 bg-red-200 p-10 rounded-2xl border border-red-500 font-semibold">
                  Aucun medicament trouvé
                </span>
              </div>
            )
          :
            (
              filteredTaleau.map((patient)=>(
              <div key={patient.id} className={`w-full min-h-20 flex items-center justify-between text-center text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
                <span className="w-[20%] p-3 overflow-auto">{patient.nom}</span>
                <span className={`overflow-auto ${styleTableau}`}>{patient.quantite}</span>
                <span className="w-[20%] p-3 overflow-auto">{patient.dateAjout}</span>
                <span className={`overflow-auto ${styleTableau}`}>{formatDate(patient.dateExpiration)}</span>
                <span className="w-[20%] p-3 flex items-center overflow-auto justify-center text-4xl space-x-4">
                  <Link to={`/Medicament/Edit/${patient.id}`} className="text-blue-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiEdit data-tooltip-id="Edit-tooltip" data-tooltip-content="Modifier ce patient" /></Link>
                  <span className="text-red-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiTrash data-tooltip-id="Delete-tooltip" data-tooltip-content="Supprimer ce patient" onClick={() =>handleDelete(patient.id)} /></span>
                </span>
              </div>
        ))
            )
        }

      </div>
      <Tooltip className="z-50" id="Add-tooltip" place="bottom" />
      <Tooltip className="z-50" id="View-tooltip" place="bottom" />
      <Tooltip className="z-50" id="Edit-tooltip" place="bottom" />
      <Tooltip className="z-50" id="Delete-tooltip" place="bottom" />
    </div>
  )
}