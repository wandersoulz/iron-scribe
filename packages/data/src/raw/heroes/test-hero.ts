import { HeroReference } from "@iron-scribe/model";

export const TestHero: HeroReference = {
  id: "hero_001",
  name: "Hero Developer",
  selections: [
    {
      choiceId: "trait_devil_sig_silver_tongue_skill_selection",
      selectedOptionId: "skill-interpersonal-persuade",
    },
    {
      choiceId: "choice_censor_array",
      selectedOptionId: "feat_censor_array_0",
    },
    {
      choiceId: "choice_censor_array_0_val_0",
      selectedOptionId: "feat_char_agility_2",
    },
    {
      choiceId: "choice_censor_array_0_val_1",
      selectedOptionId: "feat_char_reason_-1",
    },
    {
      choiceId: "choice_censor_array_0_val_2",
      selectedOptionId: "feat_char_intuition_-1",
    },
    {
      choiceId: "censor_order",
      selectedOptionId: "feat_order_paragon",
    },
    {
      choiceId: "censor_domain",
      selectedOptionId: "domain_creation",
    },
    {
      choiceId: "choice_domain_creation_skill",
      selectedOptionId: "skill-crafting-architecture",
    },
    {
      choiceId: "choice_censor_ability_sig",
      selectedOptionId: "feat_ability_ability_censor_holy_strike",
    },
  ],
  modules: {
    ancestry: {
      ancestryId: "ancestry-devil",
      purchasedTraits: [],
      signatureTraits: [
        {
          traitId: "trait_devil_sig_silver_tongue",
        },
      ],
    },
    class: {
      classId: "censor",
    },
  },
  heroCombatState: {
    level: 1,
    currentStamina: 7,
    currentRecoveries: 0,
    conditions: [],
    currentTempStamina: 0,
    surges: 0,
    numHeroicResources: 0,
  },
};
