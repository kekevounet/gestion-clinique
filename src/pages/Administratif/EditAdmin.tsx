import { useTheme } from "../../components/common/Theme"
import Input from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useDonnee } from "../../components/common/donnee";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditAdmin()
{
  // Déclarariotn
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate()
  const { administratif, setAdministratif, dispatchNotification, parametre } = useDonnee();
  const admin = administratif.find(a => a.id === Number(id))
  const [ formData, setFormData ] = useState({
    nom: admin?.nom || "",
    prenom: admin?.prenom || "",
    sexe: admin?.sexe || "",
    dateNaissance: admin?.dateNaissance || "",
    numeroTelephone: admin?.numeroTelephone || "",
    email: admin?.email || "",
    adresse: admin?.adresse || "",
    specialite: admin?.specialite || "",
    numeroOrdre: admin?.numeroOrdre || "",
    experience: admin?.experience || "",
    diplome: admin?.diplome || "",
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

  // COmportenetm
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    if (!admin) return ;

    const updatedAdministratif =
    {
      id: admin.id,
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
      type: "Update",
      payload: updatedAdministratif
    });

    Swal.fire(`${parametre.nomEtablissement}`, "Modification réussie", "success");
    navigate('/Admin');
    dispatchNotification({
      type: "Ajout",
      payload: {
        id: Date.now(),
        titre: "Administratif",
        message: "Un administrateur a été modifier",
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
        <h2 className="text-2xl font-semibold border-b pb-3">Informations de l'administrateur</h2>
        <div className="grid grid-cols-3 gap-4">
          {InfosAdministratif.map((Admin, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{Admin.field}</label>
              <Input
                placeholder={Admin.field}
                type={Admin.type}
                name={Admin.name}
                value={formData[Admin.name as keyof typeof formData]}
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
                name={AdminContact.name}
                value={formData[AdminContact.name as keyof typeof formData]}
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