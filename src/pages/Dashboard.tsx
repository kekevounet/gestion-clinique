import { BiCalendarEdit } from "react-icons/bi";
import { FaUserInjured } from "react-icons/fa";
import { AiOutlineAlert } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { BsCapsulePill } from "react-icons/bs";
import { useTheme } from "../components/common/Theme";
import { Tooltip as TooltipHover } from "react-tooltip";
import { Cell, Legend as LegendPie, Pie, PieChart, ResponsiveContainer, Tooltip as TooltipPie } from 'recharts';
import { useDonnee } from "../components/common/donnee";
import Pourcentage from "../components/layouts/Pourcentage";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

export default function Dashboard()
{
  // Déclaration
  const { theme } = useTheme();
  const { patients, medoc, meet } = useDonnee();
  const style = `w-full h-full ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`;
  const { administratif, docteurs, infirmier, parametre } = useDonnee();
  const colorPie = [ "#c0e820", "#1fd4c4", "#8c1fd4" ]
  const dataPie = [
    { name: "Admin ", value: administratif.length },
    { name: "Docteurs ", value: docteurs.length },
    { name: "Infirmier ", value: infirmier.length },
  ]

  const nombreChambreMax = parametre.nombreChambre;
  const chambresOccupees = patients.consultationTableau.length;


  // Comportement
  const now = new Date();
  const prochainRDV = meet.MeetTableau
    .map(r => ({
      ...r,
      dateTime: new Date(`${r.date}T${r.heure}`)
    }))
    .filter(r => r.dateTime > now && r.status !== "Annuler" )
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

  const RDV = prochainRDV[0];

  const totalConsultations = patients.consultationTableau.length;
  const totalMeet = meet.MeetTableau.length;
  const totalDocteurs = docteurs.length;
  const labels = Array.from({ length: 12 }, (_, i) => `Mois ${i + 1}`);
  const generateSin = (base: number, amplitude: number, phase: number) =>
    labels.map((_, i) => base + amplitude * Math.sin(i / 2 + phase));

  const data = {
    labels,
    datasets: [
      {
        label: "Taux Consultation",
        data: generateSin(totalConsultations, 5, 0),
        tension: 0.4,
        borderColor: "#c0e820",
        pointBackgroundColor: "black"
      },
      {
        label: "Taux Rendez-vous",
        data: generateSin(totalMeet, 4, 1),
        tension: 0.4,
        borderColor: "#8c1fd4",
        pointBackgroundColor: "black"
      },
      {
        label: "Taux Docteurs",
        data: generateSin(totalDocteurs, 3, 2),
        tension: 0.4,
        borderColor: "#1fd4c4",
        pointBackgroundColor: "black"
      }
    ]
  };



  // Affichage
  return(
    <div className="w-full h-[200vh] lg:h-full flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-6 p-6">
      {/* Coté gauche avec des petit bedebe */}
      <div className="w-full h-full grid grid-cols-1 grid-rows-2 gap-6">
        {/* Pourcentage en rondelle */}
        <div className="w-full lg:h-full h-[80%] grid grid-cols-2 grid-rows-2 gap-3">

          {/* Nombre de patient */}
          <Link
            to='/Consultation'
            data-tooltip-id="Patients"
            data-tooltip-content="Faire une consultation-"
            className={` flex hover:shadow-xl hover:-translate-y-0.5 duration-300 cursor-pointer flex-col space-y-5 text-lg text-center lg:text-2xl justify-center items-center ${style}
          `}>
            <span className="text-4xl"><FaUserInjured /></span>
            <span className="">Nombre de patients: {patients.consultationTableau.length}</span>
          </Link>

          {/* Médicament */}
          <Link
            to='/Medicament/Ajout'
            data-tooltip-id="Médicaments"
            data-tooltip-content="Ajouter un médicament"
            className={`flex hover:shadow-xl hover:-translate-y-0.5 duration-300 cursor-pointer py-12 relative items-center flex-col overflow-auto space-y-10 ${style}
          `}>
            {medoc.MedocTableau.map(m => m.quantite < 5 &&
              (
                <div className="flex py-5 flex-col space-y-5 justify-center items-center">
                  <span className="text-4xl text-red-600"><BsCapsulePill /></span>
                  <span className="text-lg lg:text-2xl text-center text-red-600">Le médicament <strong>{m.nom}</strong> est presque épuisé.</span>
                </div>
              )
            )}

            {medoc.MedocTableau.length !== 0 &&
              (
                <div className="flex py-5 flex-col space-y-5 justify-center items-center">
                  <span className="text-4xl text-blue-600"><BsInfoCircle /></span>
                  <span className="text-lg lg:text-2xl text-center text-blue-600">Les informations des médicaments s'affichent ici.</span>
                </div>
              )
            }

            {
              medoc.MedocTableau.length === 0 &&
              (
                <div className="absolute flex flex-col space-y-5 justify-center items-center">
                  <span className="text-5xl text-red-600"><FiAlertCircle /></span>
                  <span className="text-lg lg:text-2xl text-center">Vous n'avez aucun médicament</span>
                </div>
              )
            }

          </Link>

          {/* Nombrede  RDV */}
          <Link
            to='/Rendez-vous/Ajout'
            data-tooltip-id="RDV"
            data-tooltip-content="Ajouter un rendez-vous"
            className={` flex hover:shadow-xl hover:-translate-y-0.5 duration-300 cursor-pointer flex-col space-y-5 text-lg lg:text-2xl justify-center items-center ${style}`}>
            <span className="text-4xl"><BiCalendarEdit /></span>
            <span className="text-center">Nombre de rendez-vous prévus enregister: {meet.MeetTableau.length}</span>
          </Link>

          {/* Rendez-vous */}
          <Link
            to='/Rendez-vous'
            data-tooltip-id="RDV2"
            data-tooltip-content="Voir tous les rendez-vous"
            className={`flex hover:shadow-xl hover:-translate-y-0.5 duration-300 cursor-pointer space-y-5 flex-col text-lg lg:text-2xl justify-center text-center items-center ${
              theme === 'clair'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-yellow-900 text-yellow-200'
            }`}
          >
            <span className="text-4xl">
              <AiOutlineAlert />
            </span>

            {RDV && RDV.nom ? (
              <span>
                Rendez-vous proche avec {RDV.nom} {RDV.prenom} à {RDV.heure}
              </span>
            ) : (
              <span>Pas de rendez-vous</span>
            )}
          </Link>



        </div>
        {/* Pie chart en line ou pie */}
        <div className={`flex items-center justify-center h-1/4 -mt-24 lg:mt-0 ${style}`}>
          <Line data={data} />
        </div>
      </div>

      {/* Coté droite avec deux séparation */}
      <Link
        to='/Parametre'
        data-tooltip-id="Chambres"
        data-tooltip-content="Modifier la nombre des chambres"
        className="w-full h-full grid grid-cols-1 grid-rows-2 gap-6 -mt-24 lg:mt-0"
      >
        {/* Pourcentage en rondelle */}
        <div className={` relative ${style}`}>
          <span className="absolute top-4 left-4 text-2xl font-bold underline underline-offset-4">Personnels :</span>
            <ResponsiveContainer width="100%" height="100%" >
              <PieChart>
                <Pie
                  data={ dataPie }
                  label={({name, value}) => `${name} (${value})` }
                  cx="50%"
                  cy="50%"
                >
                  {dataPie.map((_, index)=>(
                    <Cell
                      key={`cell-${index}`}
                      fill={colorPie[index % colorPie.length]}
                    />
                  ))}
                  <TooltipPie />
                  <LegendPie />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
        </div>
        {/* Pie chart en line ou pie */}
        <div className={`flex items-center justify-center relative ${style}`}>
          <p className="absolute top-4 left-4 text-2xl font-bold underline underline-offset-4">Chambres occupées</p>
              <Pourcentage
                maxValue={nombreChambreMax}
                currentValue={chambresOccupees}
              />
        </div>
      </Link>
      <TooltipHover id='Patients' className="z-50" place="bottom" />
      <TooltipHover id='Médicaments' className="z-50" place="bottom" />
      <TooltipHover id='RDV' className="z-50" place="bottom" />
      <TooltipHover id='RDV2' className="z-50" place="bottom" />
      <TooltipHover id='--' className="z-50" place="bottom" />
    </div>
  )
}