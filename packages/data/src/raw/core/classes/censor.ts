import {
  Ability,
  CharacteristicName,
  Class,
  FeatureChoice,
  SubclassDefinition,
  SubclassOption,
} from "@iron-scribe/model";
import { DOMAINS } from "../domain";

export const CensorAbilities: Ability[] = [
  {
    id: "ability_censor_judgment",
    name: "Judgment",
    description: "You utter a prayer that outlines your foe in holy energy.",
    abilityType: "signature",
    action: "maneuver",
    target: "One enemy",
    range: { distance: 10, type: "ranged" },
    keywords: ["Magic", "Ranged"],
    level: 1,
    effect:
      "You mark the target. While marked, every time that enemy uses a Main Action, you can use a free triggered action to deal holy damage to them equal to twice your Presence score.",
  } as Ability,
  {
    id: "ability_censor_holy_strike",
    name: "Holy Strike",
    description: "Your weapon glows with divine light.",
    abilityType: "signature",
    action: "action",
    level: 1,
    target: "One enemy",
    range: { distance: 1, type: "melee" },
    keywords: ["Melee", "Weapon"],
    effect: "Deal damage.",
  } as Ability,
];

export const CensorDef: Class = {
  id: "censor",
  name: "Censor",
  type: "class",
  description:
    "A divine warrior who specializes in locking down single priority targets and supporting allies through a mix of martial prowess and divine magic.",
  heroicResourceName: "Wrath",
  staminaBase: 21,
  staminaPerLevel: 9,
  recoveries: 12,
  primaryCharacteristics: [
    CharacteristicName.Might,
    CharacteristicName.Presence,
  ],
  characteristicArrays: [
    [2, -1, -1],
    [1, 1, -1],
    [1, 0, 0],
  ],
  subclasses: [
    {
      id: "censor_order",
      type: "subclass-definition",
      name: "Order",
      options: [
        {
          id: "feat_order_exorcist",
          name: "Exorcist",
          type: "subclass-option",
          description:
            "Specializes in hunting and banishing supernatural threats.",
        } as unknown as SubclassOption,
        {
          id: "feat_order_oracle",
          type: "subclass-option",
          name: "Oracle",
          description: "Gains insight from divine visions to guide allies.",
        } as unknown as SubclassOption,
        {
          id: "feat_order_paragon",
          type: "subclass-option",
          name: "Paragon",
          description:
            "A shining example of divine virtue and martial prowess.",
        } as unknown as SubclassOption,
      ],
    },
    {
      id: "censor_domain",
      type: "subclass-definition",
      name: "Domain",
      options: DOMAINS as SubclassOption[],
    },
  ] as unknown as SubclassDefinition[],
} as unknown as Class;
