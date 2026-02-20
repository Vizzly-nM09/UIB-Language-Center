import Image from "next/image";

export default function TopNavbarLogin() {
  return (
    <div className="navbar bg-transparent">
      <div className="flex-1 dark:hidden">
        <Image
          className="w-26 sm:w-30 md:w-36 lg:w-42 h-auto"
          src="/logo/logo-uib.png"
          alt="Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden dark:flex dark:flex-1">
        <Image
          className="w-26 sm:w-30 md:w-36 lg:w-42 h-auto"
          src="/logo/logo-uib-putih.png"
          alt="Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex-none">
        <Image
          className="w-26 sm:w-30 md:w-36 lg:w-42 h-auto"
          src="/logo/go-international.png"
          alt="Logo"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
