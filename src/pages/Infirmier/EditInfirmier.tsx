import { useTheme } from "../../components/common/Theme"
import Input from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDonnee } from "../../components/common/donnee";
import { useState } from "react";
import Swal from "sweetalert2";
export default function EditInfirmier()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { id } = useParams();
  const { infirmier, setInfirmier, dispatchNotification } = useDonnee();
  const navigate = useNavigate();
  const infirmiers = infirmier.find(i=> i.id === Number(id))

  const [ formData, setFormData ] = useState({
    nom: infirmiers?.nom || "",
    prenom: infirmiers?.prenom || "",
    sexe: infirmiers?.sexe || "",
    dateNaissance: infirmiers?.dateNaissance || "",
    numeroTelephone: infirmiers?.numeroTelephone || "",
    email: infirmiers?.email || "",
    adresse: infirmiers?.adresse || "",
    specialite: infirmiers?.specialite || "",
    numeroOrdre: infirmiers?.numeroOrdre || "",
    experience: infirmiers?.experience || "",
    diplome: infirmiers?.diplome || "",
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
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    if(!infirmiers) return;
    const updatedInfirmier =
    {
      id: infirmiers.id,
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
      type: "Update",
      payload: updatedInfirmier
    })
    Swal.fire('Clinique de Kevin','Modification réussie','success')
    navigate('/Infirmier');
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Infirmier",
        message: "Un infirmier a été modifier",
        type: "Modification",
        date: new Date().toLocaleString()
      }
    })
  }

  // Affichage
  return(
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleEdit} className={`w-[80%] max-h-[80%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

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
                name={InfosInfirmier.name}
                value={formData[InfosInfirmier.name as keyof typeof formData]}
                onChange={(e) => setFormData({
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
                name={ InfoInfimierContact.name }
                value={formData[InfoInfimierContact.name as keyof typeof formData]}
                onChange={(e) => setFormData({
                  ...formData,
                  [InfoInfimierContact.name]: e.target.value
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
                name={ InfoInfirmierProfession.name }
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