import React, { useState, useEffect } from "react";
import {
  Hero,
  Library,
  Ancestry,
  RegistryName,
  HeroReference,
  AncestryTrait,
} from "@iron-scribe/model";
import { HeroesSourcebook, HeroFactory } from "@iron-scribe/data";
import { AncestrySelection } from "../components/ancestry/AncestrySelection";

interface Props {
  onNavigate: (view: "home" | "create" | "view", hero?: HeroReference) => void;
}

export const HeroCreationView: React.FC<Props> = ({ onNavigate }) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [allAncestries, setAllAncestries] = useState<Ancestry[]>([]);
  const [heroState, setHeroState] = useState<Partial<HeroReference>>({
    name: "New Hero",
  });
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const lib = new Library([HeroesSourcebook]);
    setLibrary(lib);
    lib.loadAll().then(() => {
      const traitLibrary = lib.getCompositeRegistry<AncestryTrait>(
        RegistryName.AncestryTraits,
      );
      lib
        .getCompositeRegistry<Ancestry>(RegistryName.Ancestries)
        .getAll()
        .then(async (ancestries) => {
          return Promise.all(
            ancestries.map(async (ancestry) => {
              let traits = await traitLibrary.filter({
                ancestryId: ancestry.id,
              });
              if (hero)
                traits = traits.map((trait) => trait.resolveValue(hero));
              ancestry.signatureTraits = traits.filter(
                (trait) => trait.cost === undefined,
              );
              ancestry.purchasedTraits = traits.filter(
                (trait) => trait.cost !== undefined,
              );
              return ancestry;
            }),
          );
        })
        .then(setAllAncestries);
    });
  }, []);

  // Sync rich Hero model with raw state
  useEffect(() => {
    if (library && heroState.modules?.ancestry) {
      HeroFactory.create(heroState as HeroReference, library).then(setHero);
    } else {
      setHero(null);
    }
  }, [heroState, library]);

  const handleHeroStateChange = (newState: Partial<HeroReference>) => {
    setHeroState(newState);
  };

  const handleFinalize = async () => {
    if (hero) {
      console.log("Final Hero State:", heroState);
      console.log("Hero Damage Immunities:", hero.getList("damage-immunity"));
      alert("Hero Created! (Check console for damage immunities)");
    }
    onNavigate("home");
  };

  const isComplete = hero?.isComplete() || false;

  if (!library) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
            <h1 className="text-3xl font-black tracking-tight">
              CHARACTER BUILDER
            </h1>
          </div>

          <button
            onClick={handleFinalize}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest text-sm"
            disabled={!isComplete}
          >
            Complete Build
          </button>
        </div>

        {/* Hero Name Input */}
        <div className="mb-12 max-w-md">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
            Character Name
          </label>
          <input
            type="text"
            value={heroState.name}
            onChange={(e) =>
              setHeroState({ ...heroState, name: e.target.value })
            }
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            placeholder="Enter hero name..."
          />
        </div>

        <div className="bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 shadow-2xl backdrop-blur-sm">
          <AncestrySelection
            library={library}
            allAncestries={allAncestries}
            heroState={heroState}
            onHeroStateChange={handleHeroStateChange}
            hero={hero}
          />
        </div>
      </div>
    </div>
  );
};
