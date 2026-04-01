import { Leaf } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-100 dark:border-emerald-900/40 border-t-[#1B5E20] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-[#1B5E20] dark:text-emerald-400" />
        </div>
      </div>
      <p className="mt-4 font-heading font-medium text-[#1B5E20] dark:text-emerald-400 animate-pulse">
        Loading GreenHope...
      </p>
    </div>
  );
}
