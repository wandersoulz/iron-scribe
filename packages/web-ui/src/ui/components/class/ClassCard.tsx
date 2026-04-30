import { Hero } from "@iron-scribe/model";

interface Props {
  hero: Hero;
  onClick: () => void;
}

export const ClassCard: React.FC<Props> = ({ hero, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl p-8 border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer shadow-xl shadow-black/20"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
            <span className="text-2xl">⚔️</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
            Class
          </span>
        </div>
        <h2 className="text-3xl font-black mb-2 text-white uppercase tracking-tight group-hover:text-indigo-300 transition-colors">
          {hero.class?.name || "Unknown"}
        </h2>
        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
          {hero.class?.subclasses.map((subclass) => (
            <div key={subclass.name}>
              {subclass.name}:{" "}
              {hero.resolveChoiceReference({ choiceId: subclass.id })?.name}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-700 flex-1" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Abilities
            </span>
            <div className="h-px bg-slate-700 flex-1" />
          </div>
          <div className="text-sm font-medium text-slate-300">
            {hero.class?.abilities?.length || 0} Class Abilities Available
          </div>
        </div>
        <div className="mt-8 flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>View Abilities</span>
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
