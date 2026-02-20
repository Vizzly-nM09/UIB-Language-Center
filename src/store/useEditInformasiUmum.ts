import { create } from "zustand";

const useInformasiUmum = create((set) => ({
  editInformasiUmum: null,
  setEditInformasiUmum: (informasi: any) =>
    set({ editInformasiUmum: informasi }),
}));
export default useInformasiUmum;
