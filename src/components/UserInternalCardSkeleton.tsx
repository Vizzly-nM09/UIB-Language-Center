export default function UserInternalCardSkeleton() {
  return (
    <div
      className="
      w-full flex flex-col sm:flex-row items-center sm:items-start gap-4
      rounded-xl border border-gray-200 dark:border-gray-700 
      bg-white dark:bg-gray-900 shadow-sm p-4 animate-pulse
    "
    >
      {/* Foto Skeleton */}
      <div
        className="
        w-20 h-20 sm:w-16 sm:h-16 rounded-full 
        bg-gray-300 dark:bg-gray-700
      "
      />

      {/* Info Skeleton */}
      <div className="flex-1 w-full text-center sm:text-left">
        {/* Name line */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40 mx-auto sm:mx-0 mb-3"></div>

        {/* NIP + Email lines */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-44"></div>
        </div>

        {/* Group Badge */}
        <div className="mt-4 flex justify-center sm:justify-start">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}
