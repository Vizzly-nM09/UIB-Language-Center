import Image from "next/image";
import { Highlight } from "../ui/hero-highlight";

export default function WelcomeSectionLogin() {
  return (
    <div className="md:-mt-24 flex flex-1 h-96 w-screen flex-col lg:p-10 justify-center items-center">
      <Image
        className="w-46 md:w-72 lg:w-80 mb-3 h-auto"
        src={"/img/admission-yellow.svg"}
        alt="UIB Admission"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-light">Selamat Datang</h1>
      <h1 className="font-semibold text-xl md:text-2xl text-[#2A3955] my-3">
        <Highlight className="p-2 bg-gradient-to-r from-[#F8B600] to-[#F29400] ">
          New Admission Platform
        </Highlight>
      </h1>
      <h1 className="font-semibold text-xl text-black dark:text-white mb-10">
        Universitas Internasional Batam
      </h1>
    </div>
  );
}
