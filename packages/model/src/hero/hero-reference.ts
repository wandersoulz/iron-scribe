import { AncestryReference } from "../ancestry/ancestry-reference";
import { CareerReference } from "../career/career-reference";
import { ClassReference } from "../class/class-reference";
import { CultureState } from "../culture/culture-state";
import { FeatureChoiceSelection } from "../feature/feature";
import { HeroCombatState } from "./hero-combat-state";

export interface HeroReference {
  id: string;
  name: string;
  selections?: FeatureChoiceSelection[];
  modules: {
    ancestry?: AncestryReference;
    culture?: CultureState;
    career?: CareerReference;
    class?: ClassReference;
  };
  heroCombatState: HeroCombatState;
}
