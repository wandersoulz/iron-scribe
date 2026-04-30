import React, { useState } from "react";
import { Library, Ancestry, HeroReference, Hero } from "@iron-scribe/model";
import { AncestryDetail } from "./AncestryDetail";

interface Props {
  library: Library;
  allAncestries: Ancestry[];
  heroState: Partial<HeroReference>;
  onHeroStateChange: (newState: Partial<HeroReference>) => void;
  hero: Hero | null;
}

export const AncestrySelection: React.FC<Props> = ({
  library,
  allAncestries,
  heroState,
  onHeroStateChange,
  hero,
}) => {
  const [selectedAncestryId, setSelectedAncestryId] = useState<string>("");

  const handleSelectAncestry = (ancestry: Ancestry) => {
    setSelectedAncestryId(ancestry.id);

    const newState = {
      ...heroState,
      modules: {
        ...heroState.modules,
        ancestry: {
          ancestryId: ancestry.id,
          signatureTraits: ancestry.signatureTraits.map((trait) => ({
            traitId: trait.id,
          })),
          purchasedTraits: [],
        },
      },
    };
    onHeroStateChange(newState);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]">
      {/* Ancestry List */}
      <div className="lg:col-span-3 border-r border-slate-800 pr-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
          Choose Ancestry
        </h2>
        <div className="space-y-3">
          {allAncestries.map((anc) => (
            <button
              key={anc.id}
              onClick={() => handleSelectAncestry(anc)}
              className={`w-full text-left p-5 rounded-2xl transition-all duration-500 border ${
                selectedAncestryId === anc.id ||
                heroState.modules?.ancestry?.ancestryId === anc.id
                  ? "bg-indigo-600 border-indigo-500 text-white font-black shadow-xl shadow-indigo-500/20 translate-x-2"
                  : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <span className="text-lg uppercase tracking-tight">
                {anc.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Ancestry Details */}
      <div className="lg:col-span-9">
        {!hero ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-slate-800/10 border-2 border-dashed border-slate-800/50 rounded-[3rem] p-12 text-center group">
            <div className="w-24 h-24 rounded-[2rem] bg-slate-800 flex items-center justify-center mb-8 text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
              🛡️
            </div>
            <h3 className="text-2xl font-black text-slate-300 uppercase tracking-tight mb-2">
              Heritage Unclaimed
            </h3>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs leading-loose">
              Select a lineage from the archives to define your hero's
              fundamental traits and abilities.
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
            <div className="bg-slate-800/20 rounded-[3rem] border border-slate-700/30 overflow-hidden shadow-2xl">
              <AncestryDetail
                hero={hero}
                library={library}
                isEditable={true}
                onHeroStateChange={onHeroStateChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
