import { Skill, SkillGroup } from "@iron-scribe/model";

export const SkillGroupIds = {
  Crafting: "sg_crafting",
  Exploration: "sg_exploration",
  Interpersonal: "sg_interpersonal",
  Intrigue: "sg_intrigue",
  Lore: "sg_lore",
};

export const CraftingSkills: Skill[] = [
  new Skill("skill-crafting-alchemy", "Alchemy", SkillGroupIds.Crafting),
  new Skill(
    "skill-crafting-architecture",
    "Architecture",
    SkillGroupIds.Crafting,
  ),
  new Skill(
    "skill-crafting-blacksmithing",
    "Blacksmithing",
    SkillGroupIds.Crafting,
  ),
  new Skill("skill-crafting-carpentry", "Carpentry", SkillGroupIds.Crafting),
  new Skill("skill-crafting-cooking", "Cooking", SkillGroupIds.Crafting),
  new Skill("skill-crafting-fletching", "Fletching", SkillGroupIds.Crafting),
  new Skill("skill-crafting-forgery", "Forgery", SkillGroupIds.Crafting),
  new Skill("skill-crafting-jewelry", "Jewelry", SkillGroupIds.Crafting),
  new Skill("skill-crafting-mechanics", "Mechanics", SkillGroupIds.Crafting),
  new Skill("skill-crafting-tailoring", "Tailoring", SkillGroupIds.Crafting),
];

export const ExplorationSkills: Skill[] = [
  new Skill("skill-exploration-climb", "Climb", SkillGroupIds.Exploration),
  new Skill("skill-exploration-drive", "Drive", SkillGroupIds.Exploration),
  new Skill(
    "skill-exploration-endurance",
    "Endurance",
    SkillGroupIds.Exploration,
  ),
  new Skill(
    "skill-exploration-gymnastics",
    "Gymnastics",
    SkillGroupIds.Exploration,
  ),
  new Skill("skill-exploration-heal", "Heal", SkillGroupIds.Exploration),
  new Skill("skill-exploration-jump", "Jump", SkillGroupIds.Exploration),
  new Skill("skill-exploration-lift", "Lift", SkillGroupIds.Exploration),
  new Skill(
    "skill-exploration-navigate",
    "Navigate",
    SkillGroupIds.Exploration,
  ),
  new Skill("skill-exploration-ride", "Ride", SkillGroupIds.Exploration),
  new Skill("skill-exploration-swim", "Swim", SkillGroupIds.Exploration),
];

export const InterpersonalSkills: Skill[] = [
  new Skill("skill-interpersonal-brag", "Brag", SkillGroupIds.Interpersonal),
  new Skill(
    "skill-interpersonal-empathize",
    "Empathize",
    SkillGroupIds.Interpersonal,
  ),
  new Skill("skill-interpersonal-flirt", "Flirt", SkillGroupIds.Interpersonal),
  new Skill(
    "skill-interpersonal-gamble",
    "Gamble",
    SkillGroupIds.Interpersonal,
  ),
  new Skill(
    "skill-interpersonal-handle-animals",
    "Handle Animals",
    SkillGroupIds.Interpersonal,
  ),
  new Skill(
    "skill-interpersonal-interrogate",
    "Interrogate",
    SkillGroupIds.Interpersonal,
  ),
  new Skill(
    "skill-interpersonal-intimidate",
    "Intimidate",
    SkillGroupIds.Interpersonal,
  ),
  new Skill("skill-interpersonal-lead", "Lead", SkillGroupIds.Interpersonal),
  new Skill("skill-interpersonal-lie", "Lie", SkillGroupIds.Interpersonal),
  new Skill("skill-interpersonal-music", "Music", SkillGroupIds.Interpersonal),
  new Skill(
    "skill-interpersonal-perform",
    "Perform",
    SkillGroupIds.Interpersonal,
  ),
  new Skill(
    "skill-interpersonal-persuade",
    "Persuade",
    SkillGroupIds.Interpersonal,
  ),
  new Skill(
    "skill-interpersonal-read-person",
    "Read Person",
    SkillGroupIds.Interpersonal,
  ),
];

export const IntrigueSkills: Skill[] = [
  new Skill("skill-intrigue-alertness", "Alertness", SkillGroupIds.Intrigue),
  new Skill(
    "skill-intrigue-conceal-object",
    "Conceal Object",
    SkillGroupIds.Intrigue,
  ),
  new Skill("skill-intrigue-disguise", "Disguise", SkillGroupIds.Intrigue),
  new Skill("skill-intrigue-eavesdrop", "Eavesdrop", SkillGroupIds.Intrigue),
  new Skill(
    "skill-intrigue-escape-artist",
    "Escape Artist",
    SkillGroupIds.Intrigue,
  ),
  new Skill("skill-intrigue-hide", "Hide", SkillGroupIds.Intrigue),
  new Skill("skill-intrigue-pick-lock", "Pick Lock", SkillGroupIds.Intrigue),
  new Skill(
    "skill-intrigue-pick-pocket",
    "Pick Pocket",
    SkillGroupIds.Intrigue,
  ),
  new Skill("skill-intrigue-search", "Search", SkillGroupIds.Intrigue),
  new Skill("skill-intrigue-track", "Track", SkillGroupIds.Intrigue),
];

export const LoreSkills: Skill[] = [
  new Skill("skill-lore-culture", "Culture", SkillGroupIds.Lore),
  new Skill(
    "skill-lore-criminal-underworld",
    "Criminal Underworld",
    SkillGroupIds.Lore,
  ),
  new Skill("skill-lore-history", "History", SkillGroupIds.Lore),
  new Skill("skill-lore-magic", "Magic", SkillGroupIds.Lore),
  new Skill("skill-lore-monsters", "Monsters", SkillGroupIds.Lore),
  new Skill("skill-lore-nature", "Nature", SkillGroupIds.Lore),
  new Skill("skill-lore-philosophy", "Philosophy", SkillGroupIds.Lore),
  new Skill("skill-lore-politics", "Politics", SkillGroupIds.Lore),
  new Skill("skill-lore-psionics", "Psionics", SkillGroupIds.Lore),
  new Skill("skill-lore-religion", "Religion", SkillGroupIds.Lore),
  new Skill("skill-lore-society", "Society", SkillGroupIds.Lore),
  new Skill("skill-lore-timescape", "Timescape", SkillGroupIds.Lore),
];

export const Skills: Skill[] = [
  ...CraftingSkills,
  ...ExplorationSkills,
  ...InterpersonalSkills,
  ...IntrigueSkills,
  ...LoreSkills,
];

export const SkillGroupInstances = [
  new SkillGroup(
    SkillGroupIds.Crafting,
    "Crafting",
    CraftingSkills.map((s) => s.id),
  ),
  new SkillGroup(
    SkillGroupIds.Exploration,
    "Exploration",
    ExplorationSkills.map((s) => s.id),
  ),
  new SkillGroup(
    SkillGroupIds.Interpersonal,
    "Interpersonal",
    InterpersonalSkills.map((s) => s.id),
  ),
  new SkillGroup(
    SkillGroupIds.Intrigue,
    "Intrigue",
    IntrigueSkills.map((s) => s.id),
  ),
  new SkillGroup(
    SkillGroupIds.Lore,
    "Lore",
    LoreSkills.map((s) => s.id),
  ),
];
