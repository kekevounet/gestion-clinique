import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdOutlineViewQuilt } from "react-icons/md";
import { useTheme } from "../../components/common/Theme";
import Input from "../../components/layouts/Input";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Tooltip } from "react-tooltip"
import { Link } from "react-router-dom";
import { useDonnee } from "../../components/common/donnee";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Patients()
{
  // Déclaration
  const { theme } = useTheme();
  const { patients, dispatchPatients, dispatchNotification, parametre } = useDonnee();
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
        dispatchPatients({
          type: "Delete",
          payload: id
        })
        Swal.fire(`${parametre.nomEtablissement}`, "Un patient a été supprimé", "success")
        dispatchNotification({
          type: "Ajout",
          payload: {
            id: Date.now(),
            titre: "Patient",
            message: "Un patient a été supprimer",
            type: "Suppression",
            date: new Date().toLocaleString('fr-FR')
          }
        })
      }
    })
  }

  const filteredTaleau = patients.consultationTableau.filter(p =>
    `${p.nom} ${p.prenom} ${p.numeroTelephone} ${p.symptomeObserve} ${p.decisionFinale}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
  )

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex flex-col overflow-auto">

      {/* Ajouter, Recherche */}
      <div className={`w-[300%] lg:w-full  h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>

        {/* Ajouter un patient */}
        <Link className="flex items-center justify-start ml-5 text-4xl" to="/Consultation">
          <AiOutlineUserAdd
            data-tooltip-id="Add-tooltip"
            data-tooltip-content="Ajouter un patient"
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
      <div className="lg:w-full w-[300%] h-[91.55%] overflow-auto flex flex-col p-6 gap-2">

        {/* Information patient titre */}
        <div className={`w-full min-h-20 flex items-center justify-between text-center font-bold text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
          <span className="w-[20%] p-3">Nom et prénom</span>
          <span className={styleTableau}>Numéro de téléphone</span>
          <span className="w-[20%] p-3">Maladie observé</span>
          <span className={styleTableau}>Décision du médecin</span>
          <span className="w-[20%] p-3">Actions</span>
        </div>

        {/* Information patient containera */}
        {filteredTaleau.length === 0
          ?
            (
              <div className="flex items-center justify-center text-4xl w-full h-full ">
                <span className="text-red-500 bg-red-200 p-10 rounded-2xl border border-red-500 font-semibold">
                  Aucun patient trouvé
                </span>
              </div>
            )
          :
            (
              filteredTaleau.map((patient)=>(
              <div key={patient.id} className={`w-full min-h-20 flex items-center justify-between text-center text-xl ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>
                <span className="w-[20%] p-3 overflow-auto">{patient.nom} {''} {patient.prenom}</span>
                <span className={`overflow-auto ${styleTableau}`}>{patient.numeroTelephone}</span>
                <span className="w-[20%] p-3 overflow-auto">{patient.symptomeObserve}</span>
                <span className={`overflow-auto ${styleTableau}`}>{patient.decisionFinale}</span>
                <span className="w-[20%] p-3 flex items-center overflow-auto justify-center text-4xl space-x-4">
                  <Link to={`/Patients/Infos/${patient.id}`} className="text-green-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><MdOutlineViewQuilt data-tooltip-id="View-tooltip" data-tooltip-content="Voir ce patient" /></Link>
                  <Link to={`/Patients/Edit/${patient.id}`} className="text-blue-500 cursor-pointer hover:opacity-60 hover:scale-105 duration-100"><BiEdit data-tooltip-id="Edit-tooltip" data-tooltip-content="Modifier ce patient" /></Link>
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