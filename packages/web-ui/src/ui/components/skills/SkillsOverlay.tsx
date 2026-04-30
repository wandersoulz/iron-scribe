import React, { useState, useEffect } from "react";
import { Hero, SkillGroup, RegistryName, Skill } from "@iron-scribe/model";

interface Props {
  hero: Hero;
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsOverlay: React.FC<Props> = ({ hero, isOpen, onClose }) => {
  const [groups, setSkillGroups] = useState<SkillGroup[]>([]);
  const heroSkills = hero.getList("skills") as Skill[];

  useEffect(() => {
    if (isOpen) {
      hero.library
        .getCompositeRegistry<SkillGroup>(RegistryName.SkillGroups)
        .getAll()
        .then(setSkillGroups);
    }
  }, [isOpen, hero.library]);

  const groupedSkills = groups
    .map((group) => {
      const skillsInGroup = heroSkills.filter(
        (s) => s.skillGroupId === group.id,
      );
      return { group, skills: skillsInGroup };
    })
    .filter((g) => g.skills.length > 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Slide-out Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-slate-900 border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 pb-4 border-b border-slate-800 shrink-0 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">
            Trained Skills
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {heroSkills.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl mb-4 block">📚</span>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                No skills trained yet.
              </p>
            </div>
          ) : (
            groupedSkills.map(({ group, skills }) => (
              <div key={group.id} className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                    {group.name}
                  </h3>
                  <div className="h-px bg-slate-800 flex-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 group hover:border-emerald-500/30 hover:bg-slate-800 transition-all"
                    >
                      <span className="text-sm font-bold text-slate-200 uppercase tracking-tight group-hover:text-white">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
