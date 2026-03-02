import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdOutlineViewQuilt } from "react-icons/md";
import { useTheme } from "../../components/common/Theme";
import Input from "../../components/layouts/Input";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Tooltip } from "react-tooltip"
import { Link } from "react-router-dom";
import { useDonnee } from "../../components/common/donnee";
import Swal from "sweetalert2";
import { useState } from "react";
export default function Docteurs()
{
  // Déclaration
  const { theme } = useTheme();
  const styleTableau = `w-[20%] p-3 border-x ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`;
  const { docteurs, setDocteurs, dispatchNotification, parametre } = useDonnee();
  const [ searchTerm, setSearchTerm ] = useState<string>("");

  // Comportement
  const handleDelete = (id:number) =>
  {
    Swal.fire({
      title: `${parametre.nomEtablissement}`,
      text: "Êtes vous sur de vouloir le supprimer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      confirmButtonColor: "#c51012",
    }).then((result)=>{
      if(result.isConfirmed)
      {
        setDocteurs({
          type: "Delete",
          payload: id
        });
        Swal.fire(`${parametre.nomEtablissement}`, "Un docteur a été supprimé", "success");
        dispatchNotification({
          type: "Ajout",
          payload: {
            id: Date.now(),
            titre: "Docteur",
            message: "Un docteur a été supprimer",
            type: "Suppression",
            date: new Date().toLocaleString()
          }
        })
      }
    })
  }

  const filteredDocteurs = docteurs.filter(docteur =>
    `${docteur.nom} ${docteur.prenom} ${docteur.numeroTelephone} ${docteur.specialite}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
  )

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex flex-col overflow-auto">

      {/* Ajouter, Recherche */}
      <div className={`w-[300%] lg:w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>

        {/* Ajouter un patient */}
        <Link className="flex items-center justify-start ml-5 text-4xl" to="/Docteurs/Ajout">
          <AiOutlineUserAdd
            data-tooltip-id="Add-tooltip"
            data-tooltip-content="Ajouter un docteur"
            className="cursor-pointer hover:opacity-80 hover:scale-105 duration-100"
          />
        </Link>

        {/* Barre de recherche */}
        <div className="flex items-center w-full h-full text-xl justify-end mr-20 lg:mr-5">
          <Input
            placeholder="Rechercher ici ... "
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}
          />
        </div>
      </div>

      {/* Listes des patients */}
      <div className="w-[300%] lg:w-full h-[91.55%] overflow-auto flex flex-col p-6 gap-2">

        {/* Information patient titre */}
        <div className={`w-full h-20 flex items-center justify-between text-center font-bold text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
          <span className="w-[20%] p-3">Nom</span>
          <span className={styleTableau}>Prénom</span>
          <span className="w-[20%] p-3">Téléphone</span>
          <span className={styleTableau}>Spécialité</span>
          <span className="w-[20%] p-3">Actions</span>
        </div>

        {/* Information patient containera */}

        {filteredDocteurs.length === 0
          ?
            (
              <div className="flex items-center justify-center text-4xl w-full h-full ">
                <span className="text-red-500 bg-red-200 p-10 rounded-2xl border border-red-500 font-semibold">
                  Aucun docteur trouvé
                </span>
              </div>
            )
          :
            (
              filteredDocteurs.map((docteur)=>(
                <div key={docteur.id} className={`w-full min-h-20 flex items-center justify-between text-center text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
                  <span className="w-[20%] p-3 overflow-auto">{docteur.nom}</span>
                  <span className={`overflow-auto ${styleTableau}`}>{docteur.prenom}</span>
                  <span className="w-[20%] p-3 overflow-auto">{docteur.numeroTelephone}</span>
                  <span className={`overflow-auto ${styleTableau}`}>{docteur.specialite}</span>
                  <span className="w-[20%] p-3 flex items-center overflow-auto justify-center text-4xl space-x-4">
                    <Link to={`/Docteurs/Infos/${docteur.id}`} className="text-green-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><MdOutlineViewQuilt data-tooltip-id="View-tooltip" data-tooltip-content="Voir ce docteur" /></Link>
                    <Link to={`/Docteurs/Edit/${docteur.id}`} className="text-blue-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiEdit data-tooltip-id="Edit-tooltip" data-tooltip-content="Modifier ce docteur" /></Link>
                    <span className="text-red-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiTrash data-tooltip-id="Delete-tooltip" data-tooltip-content="Supprimer ce docteur" onClick={() =>handleDelete(docteur.id)} /></span>
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