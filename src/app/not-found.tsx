import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="flex flex-row flex-wrap items-start min-h-screen bg-[#F9F9F9] dark:bg-[#212121] pb-1 px-10 pt-10 sm:pt-16">
        <div className="navbar bg-transparent">
          <div className="flex-1 dark:hidden">
            <Image
              src="/logo/logo-uib.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
          <div className="hidden dark:flex dark:flex-1">
            <Image
              src="/logo/logo-uib-putih.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
          <div className="flex-none">
            <Image
              src="/logo/go-international.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="-mt-24 flex flex-1 h-96 w-screen flex-col lg:p-10 justify-center items-center">
          <Image
            src={"/img/404.svg"}
            alt="UIB Admission"
            width={300}
            height={300}
            className="mb-3"
          />
          <h1 className="text-2xl font-light">Halaman Tidak Ditemukan</h1>
          <p className="text-lg font-light">
            Halaman yang Anda cari tidak ada.
          </p>
          <Link href="/" className="btn btn-[#FF8C00] mt-5 btn-sm">
            <span className="bx bx-arrow-back"></span>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}
