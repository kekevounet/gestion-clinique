import { useState, useMemo } from "react";
import { useDonnee } from "../components/common/donnee";
import { useTheme } from "../components/common/Theme";
import Input from "../components/layouts/Input";

type SearchResult =
  | { type: "Patient"; data: any }
  | { type: "Rendez-vous"; data: any }
  | { type: "Médicament"; data: any }
  | { type: "Personnel"; data: any };

export default function Recherches()
{
  const { theme } = useTheme();
  const {
    patients,
    meet,
    medoc,
    docteurs,
    infirmier,
    administratif
  } = useDonnee();

  const [query, setQuery] = useState<string>("");

  // 🔒 Normalisation TypeScript safe
  const normalize = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    return String(value).toLowerCase();
  };

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    const patientResults = patients.consultationTableau
      .filter(p =>
        Object.values(p).some(value =>
          normalize(value).includes(q)
        )
      )
      .map(p => ({ type: "Patient" as const, data: p }));

    const meetResults = meet.MeetTableau
      .filter(m =>
        Object.values(m).some(value =>
          normalize(value).includes(q)
        )
      )
      .map(m => ({ type: "Rendez-vous" as const, data: m }));

    const medocResults = medoc.MedocTableau
      .filter(m =>
        Object.values(m).some(value =>
          normalize(value).includes(q)
        )
      )
      .map(m => ({ type: "Médicament" as const, data: m }));

    const personnelResults = [...docteurs, ...infirmier, ...administratif]
      .filter(p =>
        Object.values(p).some(value =>
          normalize(value).includes(q)
        )
      )
      .map(p => ({ type: "Personnel" as const, data: p }));

    return [
      ...patientResults,
      ...meetResults,
      ...medocResults,
      ...personnelResults
    ];

  }, [query, patients, meet, medoc, docteurs, infirmier, administratif]);

  return(
    <div className="w-full h-full flex flex-col justify-center items-center px-10">

      <div
        className={`w-full h-[90%] p-16  shadow-xl ${
          theme === 'clair'
            ? 'bg-zinc-100 text-zinc-800'
            : 'bg-zinc-900 text-zinc-100'
        }`}
      >

        <h1 className="text-4xl font-bold mb-10">
          Recherche Globale
        </h1>

        <Input
          type="text"
          placeholder="Rechercher patient, rendez-vous, médicament, personnel ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full p-4 rounded-xl transition ${
            theme === 'clair'
              ? 'bg-white border-zinc-300 focus:border-zinc-600'
              : 'bg-zinc-800 border-zinc-700 focus:border-zinc-400'
          }`}
        />

        <div className="mt-12 space-y-6 max-h-[60vh] overflow-y-auto">

          {query && results.length === 0 && (
            <p className="opacity-60">Aucun résultat trouvé.</p>
          )}

          {results.map((result, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                theme === 'clair'
                  ? 'bg-white shadow-sm'
                  : 'bg-zinc-800 shadow-md'
              }`}
            >
              <div className="text-sm opacity-50 mb-2">
                {result.type}
              </div>

              <div className="font-medium text-lg">
                {result.data?.nom ?? "—"} {result.data?.prenom ?? ""}
              </div>

              {"numeroTelephone" in result.data && (
                <div className="text-sm opacity-70 mt-2">
                  {result.data.numeroTelephone}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}