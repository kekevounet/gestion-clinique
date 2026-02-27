import type { ButtonType } from "../common/type"
export default function Button({ value, type, className, onClick }:ButtonType)
{
  // Déclaration
  const classNameCommun = `w-full p-4 text-xl shadow-md font-bold rounded-lg bg-(--couleur) cursor-pointer hover:text-opacity-50`;

  // Afficage
  return(
    <input
      type={ type }
      value={ value }
      onClick={ onClick }
      className=
      {`
        ${classNameCommun}
        ${className ?? "" }
      `}
    />
  )
}