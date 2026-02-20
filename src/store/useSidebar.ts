import { create } from "zustand";

const useSidebar = create((set) => ({
  sidebar: [],
  updateSidebar: (sidebar: any) => set({ sidebar }),
}));

export default useSidebar;
