import React from "react";
import { Hero, Skill } from "@iron-scribe/model";

interface Props {
  hero: Hero;
}

export const SkillCard: React.FC<Props> = ({ hero }) => {
  const skills = hero.getList("skills") as Skill[];

  return (
    <div className="group relative overflow-hidden rounded-3xl p-8 border border-slate-700 bg-slate-800/40 cursor-pointer shadow-xl shadow-black/20">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
            <span className="text-2xl">🧠</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            Skills
          </span>
        </div>
        <h2 className="text-3xl font-black mb-2 text-white uppercase tracking-tight">
          Skills
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-700 flex-1" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Knowledge & Utility
            </span>
            <div className="h-px bg-slate-700 flex-1" />
          </div>
          <div className="text-sm font-medium text-slate-300">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3 flex items-center gap-3"
              >
                <span className="text-sm font-bold text-slate-200 uppercase tracking-tight group-hover:text-white">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
