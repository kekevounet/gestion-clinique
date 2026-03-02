import { useEffect } from "react";
import { useDonnee } from "../components/common/donnee";
import { Line } from "react-chartjs-2";
import Swal from "sweetalert2";


export default function Statistiques()
{
  const { administratif, docteurs, infirmier } = useDonnee();
  const { patients, meet, parametre } = useDonnee();


  const totalConsultations = patients.consultationTableau.length;
  const totalMeet = meet.MeetTableau.length;
  const totalDocteurs = docteurs.length;
  const totalAdministratif = administratif.length;
  const totalInfirmier = infirmier.length;

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
      },
      {
        label: "Taux Administrateur",
        data: generateSin(totalAdministratif, 2, 2),
        tension: 0.4,
        borderColor: "#ff3a3a",
        pointBackgroundColor: "black"
      },
      {
        label: "Taux infirmier",
        data: generateSin(totalInfirmier, 1, 2),
        tension: 0.4,
        borderColor: "#28f705",
        pointBackgroundColor: "black"
      }
    ]
  };
  useEffect(() =>
  {
    Swal.fire(`${parametre.nomEtablissement}`, "Ceci est juste un simulation mais il varie en fonction du donnée", "info")
  }, [])

  return(
    <div className="w-[110%] lg:w-full h-screen lg:scale-none scale-[170%] lg:h-full flex items-center justify-center lg:p-5 rotate-90 lg:rotate-0">
      <Line data={data} />
    </div>
  )
}