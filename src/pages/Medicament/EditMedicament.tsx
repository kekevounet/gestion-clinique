import { useTheme } from "../../components/common/Theme"
import Input from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import type { MedocState } from "../../components/common/type";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function EditMedicament()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { id } = useParams();
  const { medoc, dispatchMedoc, dispatchNotification, parametre } = useDonnee();
  const navigate = useNavigate();
  const InfosMedocs = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "quantite", type: "number", name: "quantite" },
    { field: "dateExpiration", type: "date", name: "dateExpiration" },
  ];

  // COmportement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value, type } = e.target;
    let newValue: any = value
    if ( type === "number") newValue = Number(value)
    if ( type === "text") newValue = value
    dispatchMedoc({
      type: "Onchange",
      payload: { name, value: newValue }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault()
    dispatchMedoc({
      type: 'Update'
    });
    Swal.fire(`${parametre.nomEtablissement}`, "Modification avec succès", "success");
    navigate('/Medicament');
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Médicament",
        message: "Un médicament a été modifier",
        type: "Modification",
        date: new Date().toLocaleString()
      }
    })
  }

  useEffect(() =>
  {
    const EditMedoc = medoc.MedocTableau.find(e => e.id === Number(id))
    if(EditMedoc)
    {
      dispatchMedoc({
      type: "LoadEdit",
      payload: EditMedoc
    })
    }
  }, [ id ])



  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[90%] lg:w-[80%] max-h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

      {/* Information patient */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du Médicament</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfosMedocs.map((InfosMedoc, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{InfosMedoc.field}</label>
              <Input
                placeholder={InfosMedoc.field}
                type={InfosMedoc.type}
                name={InfosMedoc.name}
                onChange={handleChange}
                value={String(medoc.MedocObjet[InfosMedoc.name as keyof MedocState] ?? '')}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Bouton enregisterer */}

      <Button
        type="submit"
        value="Enregistrer"
      />

      </form>
    </div>
  )
}