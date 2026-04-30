import React, { useState, useEffect } from "react";
import { Hero, Library, RegistryName, Career } from "@iron-scribe/model";

interface CareerCardProps {
  hero: Hero;
  library: Library;
  onClick: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  hero,
  library,
  onClick,
}) => {
  if (!hero.career) return (
    <div 
      className="group relative overflow-hidden rounded-3xl p-8 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-700 transition-all cursor-pointer"
      onClick={onClick}
    >
      <span className="text-4xl mb-4">🔮</span>
      <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
        Select Career
      </h3>
    </div>
  );

  const [careerData, setCareerData] = useState<Career | undefined>(undefined);

  useEffect(() => {
    const careerRegistry = library.getCompositeRegistry<Career>(
      RegistryName.Careers,
    );
    careerRegistry.get(hero.career!.id).then(setCareerData);
  }, [hero.career.id, library]);

  return (
    <div
      className="group relative overflow-hidden rounded-3xl p-8 border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 hover:border-emerald-500/50 transition-all duration-500 cursor-pointer shadow-xl shadow-black/20"
      onClick={onClick}
    >
      {/* Background Decoration */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
             <span className="text-2xl">⚒️</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            Career
          </span>
        </div>

        <h2 className="text-3xl font-black mb-2 text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
          {careerData?.name || "Unknown"}
        </h2>
        
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
            Background & Expertise
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Wealth</span>
            <span className="text-lg font-bold text-emerald-400">{careerData?.wealth || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Renown</span>
            <span className="text-lg font-bold text-emerald-400">{careerData?.renown || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Points</span>
            <span className="text-lg font-bold text-emerald-400">{careerData?.projectPoints || 0}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span>Manage Details</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </div>
      </div>
    </div>
  );
};
