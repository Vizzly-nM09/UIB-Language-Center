import { ModulType } from "@/types/ModulType";

export const checkModulePermission = (
  moduleList: ModulType[],
  modulePath: string
) => {
  try {
    let hasPermission = moduleList.some((modul: ModulType) =>
      new RegExp(`^${modul.modul_link}`).test(modulePath)
    );

    if (!hasPermission) {
      hasPermission = moduleList.some((modul: ModulType) =>
        modul.sub_menu?.some((subModul) =>
          new RegExp(`^${subModul.modul_link}`).test(modulePath)
        )
      );
    }
    return hasPermission;
  } catch (error) {
    return false;
  }
};
