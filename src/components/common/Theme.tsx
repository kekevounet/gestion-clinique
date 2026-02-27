import { createContext, useContext, useState } from "react";
import type { ThemeType } from "./type";

const ThemeContext = createContext<ThemeType | null>(null);

export function ThemeProvider({children}: { children: React.ReactNode })
{
  const [ theme, setTheme ] = useState('clair');
  const toggleTheme = () => setTheme( theme ==='clair' ? 'sombre' : 'clair')
  return(
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      { children }
    </ThemeContext.Provider>
  )
}

export function useTheme()
{
  const context = useContext(ThemeContext);
  if(!context)
  {
    throw new Error("Erreur, il doit être dans un putain de context");
  }
  return context;
}