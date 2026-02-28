import { BsMoonStars } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { useTheme } from "../components/common/Theme"
import Input from "../components/layouts/Input";
import { useDonnee } from "../components/common/donnee";
import Button from "../components/layouts/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Parametre()
{
  // Déclaration
  const { theme, toggleTheme } = useTheme();
  const { parametre, setParametre, dispatchNotification } = useDonnee();
  const [ formData, setFormData ] = useState(parametre);
  const InfosEtablissement = [
    { field: "Nom de l'établissement", type: "text", value: formData.nomEtablissement, name: "nomEtablissement" },
    { field: "Adresse", type: "text", value: formData.adresse, name: "adresse" },
    { field: "Téléphone principal", type: "tel", value: formData.numeroPrincipal, name: "numeroPrincipal" },
    { field: "Email officiel", type: "Email", value: formData.emailOfficiel, name: "emailOfficiel" },
    { field: "Nombres des chambres", type: "number", value: formData.nombreChambre, name: "nombreChambre" },
    { field: "Couleur", type: "color", value: formData.couleur, name: "couleur" },
  ];

  // Comportement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value } = e.target;
    setFormData(prev =>({
      ...prev,
      [ name ]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    setParametre((prev)=>({
      ...prev,
      ...formData
    }));
    Swal.fire(`${parametre.nomEtablissement}`, "Paramètre a été modifié", "success");
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Paramètre",
        message: "Paramètre a été modifié",
        type: "Modification",
        date: new Date().toLocaleString()
      }
    })
  }

  useEffect(() =>
  {
    document.title = `${formData.nomEtablissement}`
  })

  // Affichage
  return(
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[80%] max-h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

        {/* Paramètre générale */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-4 flex items-center justify-between">
            <h2 className="">Paramètre générales</h2>
            <span className="text-5xl cursor-pointer transition-opacity duration-300" onClick={toggleTheme}>
              {theme === 'clair'
                ?
                  (<BiSun />)
                :
                  (<BsMoonStars className="text-4xl" />)
              }
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {InfosEtablissement.map((Etablissement, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-1 font-medium">{Etablissement.field}</label>
                <Input
                  placeholder={Etablissement.field}
                  type={Etablissement.type}
                  value={Etablissement.value}
                  onChange={handleChange}
                  name={ Etablissement.name }
                />
              </div>
            ))}
          </div>
          <Button
            type="submit"
          />
        </section>

      </form>
    </div>
  )
}