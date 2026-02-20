import Link from "next/link";

export default function ContactUsLogin() {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <p className="text-xs text-neutral-900 dark:text-white">Hubungi Kami</p>
      <div className="w-full flex flex-row items-center justify-center gap-4">
        <Link
          href="https://uib.ac.id/"
          target="_blank"
          className="text-md text-gray-500 dark:text-white bx bx-world hover:text-blue-500"
        ></Link>
        <Link
          href="mailto:humas@uib.ac.id"
          target="_blank"
          className="text-md text-gray-500 bx bx-envelope hover:text-amber-500"
        ></Link>
        <Link
          href="https://api.whatsapp.com/send/?phone=6282174846764&text=Hallo+%3F&type=phone_number&app_absent=0"
          target="_blank"
          className="text-md text-gray-500 bx bxl-whatsapp hover:text-green-500"
        ></Link>
        <Link
          href="https://www.instagram.com/official.uib/"
          target="_blank"
          className="text-md text-gray-500 bx bxl-instagram hover:text-pink-500"
        ></Link>
        {/* <Link href="">
                <Image
                  src="/img/line-logo.webp"
                  alt="line"
                  className="w-4 h-4 grayscale"
                  width={50}
                  height={50}
                  unoptimized
                />
              </Link> */}
      </div>
    </div>
  );
}
