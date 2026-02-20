import Link from "next/link";

export default function NotAllowedPage() {
  return (
    <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">401</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-gray-100">
          Hak Akses Dibatasi
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-gray-400">
          Anda tidak memiliki izin untuk mengakses halaman ini. Jika Anda merasa
          ini adalah sebuah kesalahan, silakan hubungi IT Center untuk informasi
          lebih lanjut.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/dashboard"
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            &larr; Kembali ke Dashboard
          </Link>
          {/* <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </main>
  );
}
