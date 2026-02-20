// import { ModulType } from "@/types/ModulType";
// import { create } from "zustand";

// interface ModulState {
//   modul: ModulType[];
//   setModul: (modul: ModulType[]) => void;
// }

// export const useModul = create<ModulState>((set) => ({
//   modul: [],
//   setModul: (modul: ModulType[]) => set({ modul: modul }),
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModulType } from "@/types/ModulType";

interface ModulState {
  modul: ModulType[];
  setModul: (modul: ModulType[]) => void;
  clearModul: () => void;
}

export const useModul = create<ModulState>()(
  persist(
    (set) => ({
      modul: [],
      setModul: (modul) => set({ modul }),
      clearModul: () => set({ modul: [] }),
    }),
    {
      name: "modul", // key in localStorage
    }
  )
);
