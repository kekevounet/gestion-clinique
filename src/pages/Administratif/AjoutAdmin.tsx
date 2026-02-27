import { useTheme } from "../../components/common/Theme"
import Input from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AjoutAdmin()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { setAdministratif, dispatchNotification } = useDonnee();
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState(
  {
    nom: "",
    prenom: "",
    sexe: "",
    dateNaissance: "",
    numeroTelephone: "",
    email: "",
    adresse: "",
    specialite: "",
    numeroOrdre: "",
    experience: "",
    diplome: "",
  })
  const InfosAdministratif = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "Prénom", type: "text", name: "prenom" },
    { field: "Sexe", type: "text", name: "sexe" },
    { field: "Date de naissance", type: "date", name: "dateNaissance" },
  ];
  const InfoAdministratifContact = [
    { field: "Numéro téléphone", type: "tel", name: "numeroTelephone" },
    { field: "Email", type: "email", name: "email" },
    { field: "Adresse", type: "text", name: "adresse" },
  ];

  const InfoAdministratifProfession = [
    { field: "Spécialité", type: "text", name: "specialite" },
    { field: "Numéro d'ordre", type: "text", name: "numeroOrdre" },
    { field: "Années d'expérience", type: "text", name: "experience" },
    { field: "Diplôme", type: "text", name: "diplome" },
  ];

  // Comportement
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    const nom = formData.nom;
    const prenom = formData.prenom;
    const specialite = formData.specialite;
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Administratif",
        message: `Un administrateur au nom de ${nom} ${prenom} avec la mâitrise du ${specialite} a été ajouté avec succès.`,
        type: "Ajout",
        date: new Date().toLocaleString()
      }
    })
    const newAdministratif =
    {
      id: Date.now(),
      nom: formData.nom,
      prenom: formData.prenom,
      sexe: formData.sexe,
      dateNaissance: formData.dateNaissance,
      numeroTelephone: formData.numeroTelephone,
      email: formData.email,
      adresse: formData.adresse,
      specialite: formData.specialite,
      numeroOrdre: formData.numeroOrdre,
      experience: formData.experience,
      diplome: formData.diplome,
    }
    setAdministratif({
      type: "Ajout",
      payload: newAdministratif,
    });
    Swal.fire("Clinique de Kevin", "Administrateur ajouté avec succès", "success")
    setFormData({
      nom: "",
      prenom: "",
      sexe: "",
      dateNaissance: "",
      numeroTelephone: "",
      email: "",
      adresse: "",
      specialite: "",
      numeroOrdre: "",
      experience: "",
      diplome: "",
    });
    navigate('/Admin');
  }

  // Affichage
  return(
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[80%] max-h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

      {/* Information docteur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations de l'administrateur</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosAdministratif.map((Admin, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{Admin.field}</label>
              <Input
                placeholder={Admin.field}
                type={Admin.type}
                value={formData[Admin.name as keyof typeof formData]}
                name={Admin.name}
                onChange={(e) => setFormData({
                  ...formData,
                  [Admin.name]: e.target.value
                })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information contact */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du contact</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfoAdministratifContact.map((AdminContact, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{AdminContact.field}</label>
              <Input
                placeholder={AdminContact.field}
                type={AdminContact.type}
                value={formData[AdminContact.name as keyof typeof formData]}
                name={AdminContact.name}
                onChange={(e) => setFormData({
                  ...formData,
                  [AdminContact.name]: e.target.value
                })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information prefession */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations professionnel</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfoAdministratifProfession.map((AdminProfession, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{AdminProfession.field}</label>
              <Input
                placeholder={AdminProfession.field}
                type={AdminProfession.type}
                name={AdminProfession.name}
                value={formData[AdminProfession.name as keyof typeof formData]}
                onChange={(e) => setFormData({
                  ...formData,
                  [AdminProfession.name]: e.target.value
                })}
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