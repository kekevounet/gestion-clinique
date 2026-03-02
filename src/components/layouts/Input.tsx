import { useTheme } from "../common/Theme"
import type { InputType, TextareaType, InputCheckType } from "../common/type"
export default function Input({ value, placeholder, type, className, name, onChange }: InputType) {
  // Déclaration
  const { theme } = useTheme();
  const styleInput = `p-2 border-2 placeholder:italic rounded-lg outline-none focus:ring-2 px-3 duration-300 ring-(--couleur)`

  // Afficahge
  return (
    <input
      type={type}
      name={ name }
      value={value }
      placeholder={placeholder}
      onChange={onChange}
      className={`
        ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }
        ${styleInput}
        ${className ?? ""}
      `}
      required
    />
  )
}

export function TextArea({ value, placeholder, name, onChange }: TextareaType) {
  const { theme } = useTheme();

  return (
    <textarea
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`p-2 border-2 placeholder:italic min-h-40 col-span-3 rounded-lg outline-none focus:ring-2 px-3 duration-300 ring-(--couleur)  ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }`}
      required
    />
  )
}

export function InputCheck({ value, placeholder, type, className, name, onChange, checked }: InputCheckType) {
  // Déclaration
  const { theme } = useTheme();
  const styleInput = `p-2 border-2 placeholder:italic rounded-lg outline-none focus:ring-2 px-3 duration-300 ring-(--couleur)`

  // Afficahge
  return (
    <input
      type={type}
      name={ name }
      value={type === "radio" ? value : undefined }
      checked={checked}
      placeholder={placeholder}
      onChange={onChange}
      className={`
        ${theme === 'clair' ? 'border-zinc-200' : 'border-zinc-800' }
        ${styleInput}
        ${className ?? ""}
      `}
      required
    />
  )
}