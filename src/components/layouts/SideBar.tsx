import { FaUserInjured } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { useState } from "react";
import { HiHome, HiCalendar, HiUsers, HiClipboardList, HiBeaker, HiChartBar, HiCog, HiBell, HiSupport } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../common/Theme";
import { useDonnee } from "../common/donnee";

export default function SideBar()
{
  // Déclaration
  const { parametre, notification } = useDonnee();

  const listeMenu = [
    { titre: "Dashboard", icon: <HiHome />, lien: "" },
    { titre: "Consultation", icon: <HiClipboardList />, lien: "Consultation" },
    { titre: "Patients", icon: <FaUserInjured />, lien: "Patients" },
    { titre: "Rendez-vous", icon: <HiCalendar />, lien: "Rendez-vous" },
    { titre: "Historique", icon: <RiHistoryLine />, lien: "Historique" },
    {
      titre: "Personnels",
      icon: <HiUsers /> ,
      sousMenu: [
        { titre: "Docteurs", icon: <FaUserMd />, lien: "Docteurs" },
        { titre: "Infirmiers", icon: <FaUserNurse />, lien: "Infirmier" },
        { titre: "Administratifs", icon: <FaUserTie />, lien: "Admin" },
      ]
    },
    { titre: "Médicament", icon: <HiBeaker />, lien: "Medicament" },
    { titre: "Statistiques", icon: <HiChartBar />, lien: "Statistiques" },
    { titre: "Paramètre", icon: <HiCog />, lien: "Parametre" },
    {
      titre: "Notification",
      icon: <HiBell />,
      lien: "Notification",
      notification: notification.length
    },
    { titre: "Support", icon: <HiSupport />, lien: "Support" },
  ];
  const [ openMenu, setOpenMenu ] = useState<number |null>(null);
  const { theme, toggleTheme } = useTheme();

  // Comportement
  const handleClick = (index: number) =>
  {
    setOpenMenu(openMenu === index ? null : index);
  }


  // Affichage
  return(
    <div className={`w-[20%] h-full shadow-md flex flex-col z-40 ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
      {/* Titre */}
      <div className={`w-full min-h-[8%] overflow-auto border-b-4 flex items-center justify-start text-3xl font-bold tracking-wider italic font-[cursive] ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800'}`}>
        <span className="ml-3 py-5">{parametre.nomEtablissement}</span>
      </div>

      {/* Menu */}
      <div className="w-full max-h-[90%] flex flex-col items-center mt-8 overflow-auto">
        {/* Liste des menus */}
        {listeMenu.map((menu, index)=>(
          <div className="w-full flex flex-col" key={index}>
            {menu.sousMenu
              ?
                <div className="w-full h-full flex items-center justify-between">
                  <div
                  onClick={ ()=> menu.sousMenu && handleClick(index) }
                  className={`w-full h-14 text-xl flex items-center space-x-5 cursor-pointer relative group z-30 ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900'}`}
                  >
                    <span className="ml-5 text-2xl">{menu.icon}</span>
                    <span className="">{menu.titre}</span>
                    <span className={`absolute w-0 left-0 top-0 -z-10 h-full group-hover:w-full duration-300 ${theme === 'clair' ? 'bg-zinc-300': 'bg-zinc-700' }`}></span>
                    {menu.sousMenu && openMenu === index
                      ?
                        <BiChevronUp className="mr-5 text-xl absolute right-0" />
                      :
                        <BiChevronDown className="mr-5 text-xl absolute right-0" />
                    }
                  </div>
                </div>
              :
                <NavLink
                  to={`/${menu.lien}`}
                  className={({ isActive })=> `w-full h-14 text-xl flex items-center space-x-5 cursor-pointer group relative z-30 ${theme === 'clair' ? 'bg-zinc-100 ' : 'bg-zinc-900'} ${isActive ? `border-(--couleur) border-r-4` : '' } `}
                >
                  <span className="ml-5 text-2xl">{menu.icon}</span>
                  <span className="">{menu.titre}</span>
                  {Number(menu.notification) > 0 &&
                  (
                    <span className="absolute right-0 font-bold text-2xl text-red-600 w-10 h-10 flex items-center justify-center text-center rounded-full">
                      {menu.notification}
                    </span>
                  )}
                  <span className={`absolute w-0 left-0 top-0 -z-10 h-full group-hover:w-full duration-300 ${theme === 'clair' ? 'bg-zinc-300': 'bg-zinc-700' }`}></span>
                </NavLink>
            }
            {menu.sousMenu && openMenu === index && (
              <div className="flex flex-col duration-500">
                {menu.sousMenu.map((subMenu,subIndex)=>(
                  <NavLink to={`/${subMenu.lien}`} key={subIndex} className={({ isActive })=> `w-full h-12 text-base flex items-center space-x-5 cursor-pointer group relative z-30 ${theme === 'clair' ? 'bg-zinc-100 ' : 'bg-zinc-900'} ${isActive ? `border-(--couleur) border-r-4` : '' } `} >
                    <span className="ml-10">{subMenu.icon}</span>
                    <span className="">{subMenu.titre}</span>
                    <span className={`absolute w-0 left-0 top-0 -z-10 h-full group-hover:w-full duration-300 ${theme === 'clair' ? 'bg-zinc-300': 'bg-zinc-700' }`}></span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="w-full h-10 bg-gray-950 text-white" onClick={toggleTheme}>Thème</div>

      </div>
    </div>
  )
}
