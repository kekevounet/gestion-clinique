import { BiTrash } from "react-icons/bi";
import { Tooltip } from "react-tooltip"
import Input from "../components/layouts/Input";
import { useTheme } from "../components/common/Theme";
import { useDonnee } from "../components/common/donnee";
import Swal from "sweetalert2";
import { useState } from "react";
export default function Historique()
{
  // Déclaration
  const { theme } = useTheme();
  const { historique, dispatchHistorique, parametre } = useDonnee();
  const [ searchTerm, setSearchTerm ] = useState('');
  const styleTableau = `w-[20%] p-3 border-x ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`;

  // Comportement
  const handleDelete = (id: number) =>
  {
    Swal.fire({
      title: `${parametre.nomEtablissement}`,
      text: "Voulez-vous vraiment le supprimer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      confirmButtonColor: "#c51012"
    }).then((result) =>
    {
      if (result.isConfirmed)
      {
        dispatchHistorique({
          type: "Delete",
          payload: id
        })
      }
    })
  }

  const filtereHistorique = historique.filter(h =>
    `${h.date} ${h.type} ${h.nom} ${h.info}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
  )

  // Affichage
  return(
    <div className="w-full h-full flex flex-col">

      {/* Ajouter, Recherche */}
      <div className={`w-full h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>

       {/* Texte */}
        <div className="flex items-center w-1/2 justify-start ml-5 text-4xl font-bold">
          Historiques
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center w-full h-full text-xl justify-end mr-5">
          <Input
            placeholder="Rechercher ici ... "
            value={ searchTerm }
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text" className={`${theme === "clair" ? "bg-zinc-100" : "bg-zinc-900" }`} />
        </div>
      </div>

      {/* Listes des patients */}
        <div className="w-full h-[91.55%] overflow-auto flex flex-col p-6 gap-2">

          {/* Information patient titre */}
          <div className={`w-full min-h-20 flex items-center justify-between text-center font-bold text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
            <span className="w-[20%] p-3">Date et heure</span>
            <span className={styleTableau}>Type</span>
            <span className="w-[20%] p-3">Nom</span>
            <span className={styleTableau}>Information</span>
            <span className={`w-[20%] p-3 ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`}>Action</span>
          </div>

          {/* Information patient containera */}
          {filtereHistorique.map(h =>(
            <div className={`w-full min-h-20 flex items-center justify-between text-center text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
              <span className="w-[20%] p-3 overflow-auto">{h.date}</span>
              <span className={` overflow-auto ${styleTableau}`}>{h.type}</span>
              <span className="w-[20%] p-3 overflow-auto">{h.nom}</span>
              <span className={` overflow-auto ${styleTableau}`}>{h.info}</span>
              <span className={`w-[20%] p-3 flex items-center overflow-auto justify-center text-4xl space-x-4 ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`}>
                <span className="text-red-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100" onClick={() =>handleDelete(h.id)}><BiTrash data-tooltip-id="Delete-tooltip" data-tooltip-content="Supprimer cette historique" /></span>
              </span>
            </div>
          ))}

        </div>

      <Tooltip className="z-50" id="Add-tooltip" place="bottom" />
      <Tooltip className="z-50" id="Delete-tooltip" place="bottom" />
    </div>
  )
}