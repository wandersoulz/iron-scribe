import React from "react";
import { Hero } from "@iron-scribe/model";
import { AbilityCard } from "@iron-scribe/ui-shared";

interface Props {
  hero: Hero;
  isOpen: boolean;
  onClose: () => void;
}

export const AbilitiesOverlay: React.FC<Props> = ({
  hero,
  isOpen,
  onClose,
}) => {
  const abilities = hero.allAbilities;

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
            Class Abilities
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {abilities.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl mb-4 block">🔮</span>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                No abilities found for this class.
              </p>
            </div>
          ) : (
            abilities.map((ability) => (
              <div key={ability.id} className="web-ability-card">
                <AbilityCard ability={ability} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
