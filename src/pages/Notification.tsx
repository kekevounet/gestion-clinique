import { BiTrash } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { useTheme } from "../components/common/Theme"
import Input from "../components/layouts/Input";
import { useDonnee } from "../components/common/donnee";
import Swal from "sweetalert2";
import { useState } from "react";


export default function Notification()
{
  // Déclaration
  const { theme } = useTheme();
  const { notification, dispatchNotification } = useDonnee();
  const [ searchTerm, setSearchTerm ] = useState('');

  // Comportement
  const handleDelete = ( id: number ) =>
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
          dispatchNotification({
            type: "Delete",
            payload: id
          })
          Swal.fire("Clinique de Kevin", "Cette notification a été supprimé", "success")
        }
    })
  }

  const filteredNotif = notification.filter(notif =>
    `${notif.titre} ${notif.message} ${notif.date}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
  )

  const handleDeleteAll = () =>
  {
    Swal.fire({
      title: "Clinique de Niavo",
      text: "Voulez-vous vraiment tout supprimer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      confirmButtonColor: "#c51012"
    }).then((result) =>
    {
      if ( result.isConfirmed )
      {
        dispatchNotification({
          type: "DeleteAll"
        });
        Swal.fire("Clinique de Kevin", "Tous les notifications ont été supprimés", "success")
      }
    })
  }

  // Affichage
  return(
    <div className="w-full h-full flex flex-col relative">

      {/* recherche barre en haut */}
      <div className={`w-full min-h-[8.45%] border-b-4 text-3xl flex items-center justify-between ${theme === 'clair' ? 'border-zinc-100' : 'border-zinc-900' }`}>

        {/* Texte */}
        <div className="flex items-center w-full justify-start ml-5 text-4xl font-bold">
          Centre de notification
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center w-full h-full text-xl justify-end mr-5">
          <Input
            placeholder="Rechercher ici ... "
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${theme === "clair" ? 'bg-zinc-100' : 'bg-zinc-900'}`}
          />
        </div>
      </div>

      {/* Contenu notification */}
      <div className="w-full h-[91.55] overflow-auto p-10 grid-cols-3 grid gap-4">

        {filteredNotif.map(notif => (
          <section key={notif.id} className={`w-full h-[20vh] shadow-md relative duration-300 group ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' } `}>
            <div className={`w-full h-[35%] flex justify-between items-center`}>
              <p className={`ml-4 text-2xl font-bold
                ${notif.type === 'Modification' ? 'text-blue-500' :
                  notif.type === 'Suppression' ? 'text-red-500' :
                  notif.type === 'Ajout' ? 'text-green-500' : ''
                }
              `}>{notif.titre}</p>
              <p className="mr-4 text-5xl text-red-500 cursor-pointer"><BiX onClick={() => handleDelete(notif.id)} /></p>
            </div>
            <div className={`w-full h-[75%] p-4 text-xl border-t-4  ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`}>
              {notif.message}
            </div>
            <span className="absolute bottom-3 right-3 italic">Enregistré le {notif.date}</span>
            {/* <div className="absolute w-0 h-px bottom-0 left-0 bg-(--couleur) group-hover:w-full duration-300"></div> */}
          </section>
        ))}

      </div>

        {notification.length >= 2 && (
          <section onClick={handleDeleteAll} className="fixed bottom-5 right-5 w-20 h-20 z-50 bg-red-100 border border-red-700 flex items-center justify-center rounded-full">
            <BiTrash className="text-5xl text-red-700 cursor-pointer" />
          </section>
        )}

    </div>
  )
}