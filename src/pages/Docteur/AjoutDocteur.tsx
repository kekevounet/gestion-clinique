import { useTheme } from "../../components/common/Theme";
import Input from "../../components/layouts/Input";
import Button from "../../components/layouts/Button";
import { useState } from "react";
import { useDonnee } from "../../components/common/donnee";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AjoutDocteur()
{
  // Déclarariotn
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setDocteurs, dispatchNotification, dispatchHistorique, parametre } = useDonnee();
  const [ formData, setFormData ] = useState({
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
  const InfosDocteurs = [
    { field: "Nom", type: "text", name: "nom" },
    { field: "Prénom", type: "text", name: "prenom" },
    { field: "Sexe", type: "text", name: "sexe" },
    { field: "Date de naissance", type: "date", name: "dateNaissance" },
  ];
  const InfoDocteursContact = [
    { field: "Numéro téléphone", type: "tel", name: "numeroTelephone" },
    { field: "Email", type: "email", name: "email" },
    { field: "Adresse", type: "text", name: "adresse" },
  ];
  const InfoDocteursProfession = [
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
        titre: "Docteur",
        message: `Un docteur au nom de ${nom} ${prenom} avec la mâitrise du ${specialite} a été ajouté avec succès.`,
        type: "Ajout",
        date: new Date().toLocaleString()
      }
    });
    dispatchHistorique({
      type: "Ajout",
      payload: {
        id: Date.now(),
        type: "Docteur",
        nom: `${nom} ${prenom}`,
        info: `Maîtrise du ${specialite}`,
        date: new Date().toLocaleString('fr-FR')
      }
    })
    const newDocteur =
    {
      id: Date.now(),
      nom:formData.nom,
      prenom:formData.prenom,
      sexe:formData.sexe,
      dateNaissance:formData.dateNaissance,
      numeroTelephone:formData.numeroTelephone,
      email:formData.email,
      adresse:formData.adresse,
      specialite:formData.specialite,
      numeroOrdre:formData.numeroOrdre,
      experience:formData.experience,
      diplome:formData.diplome,
    }
    setDocteurs({
      type: "Ajout",
      payload: newDocteur,
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
    });
    Swal.fire(`${parametre.nomEtablissement}`, "Docteur ajouté avec succès","success");
    navigate('/Docteurs')

  }

  // Affichage
  return(
    <div className="w-full h-screen lg:h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-[90%] lg:w-[80%] max-h-[90%] p-7 space-y-7 overflow-auto ${theme === 'clair' ? 'bg-zinc-100' : 'bg-zinc-900' }`}>

      {/* Information docteur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du docteur</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfosDocteurs.map((InfosDocteur, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{InfosDocteur.field}</label>
              <Input
                placeholder={InfosDocteur.field}
                type={InfosDocteur.type}
                name={InfosDocteur.name}
                value={formData[InfosDocteur.name as keyof typeof formData]}
                onChange={(e) => setFormData({
                  ...formData,
                  [InfosDocteur.name]: e.target.value
                })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information contact */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations du contact</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfoDocteursContact.map((contact, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{contact.field}</label>
              <Input
                placeholder={contact.field}
                type={contact.type}
                name={contact.name}
                value={formData[contact.name as keyof typeof formData]}
                onChange={(e) => setFormData({
                  ...formData,
                  [contact.name]: e.target.value
                })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Information prefession */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-3">Informations professionnel</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {InfoDocteursProfession.map((profession, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium">{profession.field}</label>
              <Input
                placeholder={profession.field}
                type={profession.type}
                name={profession.name}
                value={formData[profession.name as keyof typeof formData]}
                onChange={(e) => setFormData({
                  ...formData,
                  [profession.name]: e.target.value
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