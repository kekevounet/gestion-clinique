import { useTheme } from "../../components/common/Theme"
import Input from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useState } from "react";
import { useDonnee } from "../../components/common/donnee";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AjoutInfirmier()
{
  // Déclarariotn
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setInfirmier, dispatchNotification } = useDonnee();
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
  const InfosInfirmiers = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "Prénom", type: "text", name: "prenom" },
    { field: "Sexe", type: "text", name: "sexe" },
    { field: "Date de naissance", type: "date", name: "dateNaissance" },
  ];
  const InfoInfimierContacts = [
    { field: "Numéro téléphone", type: "tel", name: "numeroTelephone" },
    { field: "Email", type: "email", name: "email" },
    { field: "Adresse", type: "text", name: "adresse" },
  ];

  const InfoInfirmierProfessions = [
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
        titre: "Infirmier",
        message: `Un infirmier au nom de ${nom} ${prenom} avec la maîtrise du ${specialite} a été ajouté avec succès.`,
        type: "Ajout",
        date: new Date().toLocaleString('fr-FR')
      }
    })
    const newInfirmier =
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
    setInfirmier({
      type: "Ajout",
      payload: newInfirmier
    });
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
    })
    Swal.fire("Clinique de Kevin", "Docteur ajouté avec succès", "success");
    navigate('/Infirmier');

  }

  // Affichage
  return(
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[80%] max-h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

      {/* Information docteur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations de l'infirmier</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosInfirmiers.map((InfosInfirmier, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{InfosInfirmier.field}</label>
              <Input
                placeholder={InfosInfirmier.field}
                type={InfosInfirmier.type}
                value={formData[InfosInfirmier.name as keyof typeof formData]}
                name={InfosInfirmier.name}
                onChange={(e)=>setFormData({
                  ...formData,
                  [InfosInfirmier.name]: e.target.value
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
          {InfoInfimierContacts.map((InfoInfimierContact, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{InfoInfimierContact.field}</label>
              <Input
                placeholder={InfoInfimierContact.field}
                type={InfoInfimierContact.type}
                value={formData[InfoInfimierContact.name as keyof typeof formData]}
                name={ InfoInfimierContact.name }
                onChange={(e) => setFormData({
                  ...formData,
                  [InfoInfimierContact.name] : e.target.value
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
          {InfoInfirmierProfessions.map((InfoInfirmierProfession, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{InfoInfirmierProfession.field}</label>
              <Input
                placeholder={InfoInfirmierProfession.field}
                type={InfoInfirmierProfession.type}
                value={formData[InfoInfirmierProfession.name as keyof typeof formData]}
                onChange={(e) => setFormData({
                  ...formData,
                  [InfoInfirmierProfession.name]: e.target.value
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