import { useEffect } from "react";
import { useDonnee } from "../common/donnee";

export default function Couleur({ children }: { children: React.ReactNode })
{
  // Déclaration
  const { parametre } = useDonnee();

  // Comportement
  useEffect(()=>
  {
    document.documentElement.style.setProperty(
      "--couleur",
      parametre.couleur
    )
  }, [parametre.couleur]);

  // Affichage
  return <>{ children }</>;
}