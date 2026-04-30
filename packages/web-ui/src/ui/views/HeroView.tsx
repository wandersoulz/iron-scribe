import React, { useState, useEffect } from "react";
import { Hero, Library, HeroReference } from "@iron-scribe/model";
import { StatSummary } from "@iron-scribe/ui-shared";
import { HeroesSourcebook, HeroFactory } from "@iron-scribe/data";
import { AncestryCard } from "../components/ancestry/AncestryCard";
import { AncestryDetail } from "../components/ancestry/AncestryDetail";
import { SkillCard } from "../components/skills/SkillCard";
import { AbilitiesOverlay } from "../components/ability/AbilitiesOverlay";
import { ClassCard } from "../components/class/ClassCard";

interface Props {
  heroReference?: HeroReference;
  onNavigate: (view: "home" | "create" | "view", hero?: HeroReference) => void;
}

export const HeroView: React.FC<Props> = ({ heroReference, onNavigate }) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [heroState, setHeroState] = useState<HeroReference | undefined>(
    heroReference,
  );
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    setLibrary(new Library([HeroesSourcebook]));
  }, []);

  // Any time the state JSON or library updates, we recalculate the rich model instance
  useEffect(() => {
    if (library && heroState) {
      library
        .loadAll()
        .then(() => HeroFactory.create(heroState, library).then(setHero));
    }
  }, [heroState, library]);

  const [isAncestryOpen, setIsAncestryOpen] = useState(false);
  const [isAbilitiesOpen, setIsAbilitiesOpen] = useState(false);

  if (!library || !hero || !heroState) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-6"></div>
        <p className="text-xl font-bold text-slate-400">
          Loading Character Sheet...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-bold text-sm uppercase tracking-widest">
                Back to Home
              </span>
            </button>
            <div className="h-8 w-px bg-slate-700" />
            <h1 className="text-4xl font-black tracking-tight text-white uppercase">
              {hero.reference.name}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-400">
              Level {hero.getNumericStat("level")} {hero.class?.name || "Hero"}
            </span>
            <div className="h-6 w-px bg-slate-700 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="text-xs font-bold uppercase tracking-tight text-slate-300">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Hero Stats Section */}
        <div className="mb-12 bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">
              Hero Statistics
            </h3>
            <div className="h-px bg-slate-700 flex-1" />
          </div>
          <StatSummary hero={hero} />
        </div>

        {/* Modules Grid */}
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">
            Character Modules
          </h3>
          <div className="h-px bg-slate-700 flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AncestryCard
              hero={hero}
              onClick={() => setIsAncestryOpen(true)}
              library={library}
            />
          </div>

          <div>
            <ClassCard hero={hero} onClick={() => setIsAbilitiesOpen(true)} />
          </div>

          <div className="lg:col-span-1">
            <SkillCard hero={hero} />
          </div>

          <div className="p-8 rounded-3xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 bg-slate-800/20">
            <span className="text-4xl mb-4">🔮</span>
            <h3 className="font-bold text-sm uppercase tracking-widest">
              Career
            </h3>
            <p className="text-[10px] mt-2 opacity-50">Component Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Side Detail Panel Overlay - Ancestry */}
      {isAncestryOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsAncestryOpen(false)}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-slate-900 border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isAncestryOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 pb-4 border-b border-slate-800 shrink-0 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">
            Ancestry Details
          </h2>
          <button
            onClick={() => setIsAncestryOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <AncestryDetail
            hero={hero}
            library={library}
            isEditable={false}
            onHeroStateChange={setHeroState as any}
          />
        </div>
      </div>

      {/* Abilities Overlay */}
      <AbilitiesOverlay
        hero={hero}
        isOpen={isAbilitiesOpen}
        onClose={() => setIsAbilitiesOpen(false)}
      />
    </div>
  );
};
