// 📂 app/dashboard/_components/stat-card.tsx
import { memo } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

export const StatCard = memo(({ title, value, icon: Icon, color, isPercent = false }: any) => (
  <div className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    
    {/* Background Blob Halus */}
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500 ${color}`}></div>
    
    <div className="flex items-center gap-4 relative z-10">
      {/* Icon Wrapper Compact */}
      <div className={`p-3 rounded-xl ${color} text-white shadow-sm shrink-0`}>
         <Icon />
      </div>
      
      {/* Text Area */}
      <div className="flex flex-col">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{title}</p>
        <h3 className="text-2xl font-black text-gray-800 tracking-tight leading-none">
          <AnimatedNumber value={value} />{isPercent && <span className="text-lg ml-0.5">%</span>}
        </h3>
      </div>
    </div>
  </div>
));
StatCard.displayName = "StatCard";