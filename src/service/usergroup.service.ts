import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getUsergroupData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/usergroup/get-usergroup", {
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
        message: "Gagal mengambil data grup",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data grup",
    });
    return [];
  }
};

export const getModulGroup = async (token: string, groupId: string) => {
  try {
    const res = await axiosClient.get(
      `/api/usergroup/get-modul-group/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
  } catch (error: any) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data modul",
    });
    return [];
  }
};

export const createUsergroup = async (token: string, usergroup: any) => {
  const res = await axiosClient.put(
    "/api/usergroup/create-usergroup",
    usergroup,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create usergroup response:", res);

  return res.data;
};

export const editUsergroup = async (token: string, usergroup: any) => {
  const res = await axiosClient.patch(
    "/api/usergroup/edit-usergroup",
    usergroup,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit usergroup response:", res);

  return res.data;
};

export const editModulGroup = async (token: string, modulGroup: any) => {
  const res = await axiosClient.patch(
    "/api/usergroup/edit-modul-group",
    modulGroup,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit usergroup response:", res);

  return res.data;
};

export const deleteUsergroup = async (token: string, usergroupId: string) => {
  const res = await axiosClient.delete(
    `/api/usergroup/delete-usergroup/${usergroupId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete usergroup response:", res);

  return res.data;
};
