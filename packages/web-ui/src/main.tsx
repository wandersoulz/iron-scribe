import "reflect-metadata";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { View, StyleSheet } from "react-native";
import { HomeView, HeroCreationView, HeroView } from "@iron-scribe/ui-shared";
import { HeroReference } from "@iron-scribe/model";

// Fix for react-native-web Animated compatibility in Vite
if (typeof global === "undefined") {
  (window as any).global = window;
}

const App: React.FC = () => {
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
    <View style={styles.container}>
      {currentView === "home" && <HomeView onNavigate={handleNavigate} />}
      {currentView === "create" && (
        <HeroCreationView onNavigate={handleNavigate} />
      )}
      {currentView === "view" && (
        <HeroView heroReference={selectedHero} onNavigate={handleNavigate} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%", // Inherit height from #root
    backgroundColor: "#020617", // slate-950
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
