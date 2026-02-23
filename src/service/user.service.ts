import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getUserData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/user/get-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("getUserData response:", res.data);

    if (res.status === 200) {
      console.log("getUserData final data:", res.data.data);
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data pengguna",
      });
      return [];
    }
  } catch (error) {
    console.error("getUserData error:", error);
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data pengguna",
    });
    return [];
  }
};

export const createUser = async (token: string, user: any) => {
  const res = await axiosClient.post("/api/user/create-user", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create user response:", res);

  return res.data;
};

export const editUser = async (token: string, user: any) => {
  const res = await axiosClient.post("/api/user/edit-user", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit user response:", res);

  return res.data;
};

export const deleteUser = async (token: string, userId: string) => {
  const res = await axiosClient.delete(`/api/user/delete-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("delete user response:", res);

  return res.data;
};
