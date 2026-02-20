import { create } from "zustand";

const useDetailInformasiUmum = create((set) => ({
  detailInformasiUmum: null,
  setDetailInformasiUmum: (informasi: any) =>
    set({ detailInformasiUmum: informasi }),
}));
export default useDetailInformasiUmum;
