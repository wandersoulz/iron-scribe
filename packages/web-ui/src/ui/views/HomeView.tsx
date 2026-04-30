import React from "react";
import { HeroReference } from "@iron-scribe/model";
import { TestHero } from "@iron-scribe/data";

interface Props {
  onNavigate: (view: "home" | "create" | "view", hero?: HeroReference) => void;
}

export const HomeView: React.FC<Props> = ({ onNavigate }) => {
  // Mock stored characters
  const savedHeroes: HeroReference[] = [TestHero];

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500/30">
      {/* Hero/Hero Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(63,94,251,0.15),rgba(252,70,107,0.05))] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/20 ring-1 ring-white/20">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-slate-400">
            IRON SCRIBE
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Saved Characters Section */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                Your Heroes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedHeroes.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => onNavigate("view", hero)}
                  className="group relative flex flex-col text-left p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-300 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <span className="text-xl font-bold">{hero.name[0]}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-slate-700 text-slate-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all">
                      View Sheet
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-indigo-300 transition-colors">
                    {hero.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Character ID: {hero.id}
                  </p>

                  {/* Hover Decoration */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </button>
              ))}

              {/* Empty State / Create New Placeholder in List */}
              <button
                onClick={() => onNavigate("create")}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-indigo-600/20 transition-all">
                  <span className="text-2xl text-slate-500 group-hover:text-indigo-400">
                    +
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-indigo-400">
                  Add New Hero
                </span>
              </button>
            </div>
          </div>

          {/* Quick Actions / Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <span className="block text-2xl font-black">
                      {savedHeroes.length}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Total Heroes
                    </span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <span className="block text-2xl font-black">1</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Sourcebooks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
