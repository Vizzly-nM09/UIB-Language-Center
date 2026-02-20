export type ModulType = {
    modul_id: string;
    modul_name: string;
    modul_link: string;
    modul_icon: string;
    modul_main_menu: string;
    modul_urutan: string;
    sub_menu: ModulType[] | null;
};