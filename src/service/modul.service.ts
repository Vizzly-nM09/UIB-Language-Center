import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getModulData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/modul/get-modul", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data modul",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data modul",
    });
    return [];
  }
};

export const createModul = async (token: string, modul: any) => {
  const res = await axiosClient.put("/api/modul/create-modul", modul, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create user response:", res);

  return res.data;
};

export const editModul = async (token: string, modul: any) => {
  const res = await axiosClient.patch("/api/modul/edit-modul", modul, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit user response:", res);

  return res.data;
};

export const deleteModul = async (token: string, modulId: string) => {
  const res = await axiosClient.delete(`/api/modul/delete-modul/${modulId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("delete user response:", res);

  return res.data;
};
