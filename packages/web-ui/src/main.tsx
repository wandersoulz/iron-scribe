import "reflect-metadata";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HomeView } from "./ui/views/HomeView";
import { HeroCreationView } from "./ui/views/HeroCreationView";
import { HeroView } from "./ui/views/HeroView";
import { HeroReference } from "@iron-scribe/model";
import "./index.css";

const App = () => {
  const [currentView, setCurrentView] = useState<"home" | "create" | "view">(
    "home",
  );
  const [selectedHero, setSelectedHero] = useState<HeroReference | undefined>(
    undefined,
  );

  const handleNavigate = (
    view: "home" | "create" | "view",
    hero?: HeroReference,
  ) => {
    setCurrentView(view);
    if (hero) {
      setSelectedHero(hero);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {currentView === "home" && <HomeView onNavigate={handleNavigate} />}
      {currentView === "create" && (
        <HeroCreationView onNavigate={handleNavigate} />
      )}
      {currentView === "view" && (
        <HeroView heroReference={selectedHero} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
