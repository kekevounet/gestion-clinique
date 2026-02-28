import Dashboard from "./pages/Dashboard";
import { Routes, Route } from 'react-router-dom';
import SideBar from "./components/layouts/SideBar";
import { useTheme } from "./components/common/Theme";
import Patients from "./pages/Patients/Patients";
import Consultation from "./pages/Patients/Consultation";
import InfosPatient from "./pages/Patients/InfosPatient";
import EditPatient from "./pages/Patients/EditPatient";
import Rendez_vous from "./pages/Rendez-vous/Rendez_vous";
import AjoutRendez_vous from "./pages/Rendez-vous/AjoutRendez_vous";
import Historique from "./pages/Historique";
import InfosRendez_vous from "./pages/Rendez-vous/InfosRendez_vous";
import EditRendez_vous from "./pages/Rendez-vous/EditRendez_vous";
import Docteurs from "./pages/Docteur/Docteurs";
import AjoutDocteur from "./pages/Docteur/AjoutDocteur";
import InfosDocteur from "./pages/Docteur/InfosDocteur";
import EditDocteur from "./pages/Docteur/EditDocteur";
import Admin from "./pages/Administratif/Admin";
import AjoutAdmin from "./pages/Administratif/AjoutAdmin";
import EditAdmin from "./pages/Administratif/EditAdmin";
import InfosAdmin from "./pages/Administratif/InfosAdmin";
import Infirmier from "./pages/Infirmier/Infirmier";
import AjoutInfirmier from "./pages/Infirmier/AjoutInfirmier";
import EditInfirmier from "./pages/Infirmier/EditInfirmier";
import InfosInfirmier from "./pages/Infirmier/InfosInfirmier";
import Parametre from "./pages/Parametre";
import Medicament from "./pages/Medicament/Medicament";
import AjoutMedicament from "./pages/Medicament/AjoutMedicament";
import EditMedicament from "./pages/Medicament/EditMedicament";
import Statistiques from "./pages/Statistiques";
import Notification from "./pages/Notification";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Support from "./pages/Support";
import { useDonnee } from "./components/common/donnee";
import Recherches from "./pages/Recheches";

export default function App()
{
  // Déclaration
  const { theme } = useTheme();
  const { parametre } = useDonnee();
  // Comportement
  useEffect(() =>
  {
    Swal.fire(`${parametre.nomEtablissement}`, 'Ce site est encore en cours de construction et n\'est disponible que sur pc pour l\'instant. merci ' ,'warning')
  }, [])

  // Affichage
  return(
    <div className={`w-full h-screen flex overflow-hidden ${theme === 'clair' ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-white' }`}>
      <SideBar />
      <Routes>
        <Route path="/" element={ <Dashboard /> } />

        {/* Patients */}
        <Route path="/Patients" element={ <Patients /> } />
        <Route path="/Consultation" element={ <Consultation /> } />
        <Route path="/Patients/Infos/:id" element={ <InfosPatient /> } />
        <Route path="/Patients/Edit/:id" element={ <EditPatient /> } />

        {/* Rendez-vous */}
        <Route path="/Rendez-vous" element={ <Rendez_vous /> } />
        <Route path="/Rendez-vous/Ajout" element={ <AjoutRendez_vous /> } />
        <Route path="/Rendez-vous/Infos/:id" element={ <InfosRendez_vous /> } />
        <Route path="/Rendez-vous/Edit/:id" element={ <EditRendez_vous /> } />

        <Route path="/Historique" element={ <Historique /> } />

        {/* Docteurs */}
        <Route path="/Docteurs" element={ <Docteurs /> } />
        <Route path="/Docteurs/Ajout" element={ <AjoutDocteur /> } />
        <Route path="/Docteurs/Infos/:id" element={ <InfosDocteur /> } />
        <Route path="/Docteurs/Edit/:id" element={ <EditDocteur /> } />

        {/* Infirmier */}
        <Route path="/Infirmier" element={ <Infirmier /> } />
        <Route path="/Infirmier/Ajout" element={ <AjoutInfirmier /> } />
        <Route path="/Infirmier/Infos/:id" element={ <InfosInfirmier /> } />
        <Route path="/Infirmier/Edit/:id" element={ <EditInfirmier /> } />

        {/* Administratif */}
        <Route path="/Admin" element={ <Admin /> } />
        <Route path="/Admin/Ajout" element={ <AjoutAdmin /> } />
        <Route path="/Admin/Infos/:id" element={ <InfosAdmin /> } />
        <Route path="/Admin/Edit/:id" element={ <EditAdmin /> } />

        <Route path="/Parametre" element={ <Parametre /> } />

        {/* Médicament */}
        <Route path="/Medicament" element={ <Medicament /> } />
        <Route path="/Medicament/Ajout" element={ <AjoutMedicament /> } />
        <Route path="/Medicament/Edit/:id" element={ <EditMedicament /> } />

        <Route path="/Statistiques" element={ <Statistiques /> } />

        <Route path="/Notification" element={ <Notification /> } />

        <Route path="/Support" element={ <Support /> } />

        <Route path="/Recherches" element={ <Recherches /> } />

      </Routes>
    </div>
  )
}