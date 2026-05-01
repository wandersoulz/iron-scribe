import { Perk, PerkType } from "@iron-scribe/model";
import {
  CraftingPerkDescriptions,
  ExplorationPerkDescriptions,
  InterpersonalPerkDescriptions,
  IntriguePerkDescriptions,
  LorePerkDescriptions,
  SupernaturalPerkDescriptions,
} from "./perk-descriptions";

export const PerkTypeIds = {
  Crafting: "pt_crafting",
  Exploration: "pt_exploration",
  Interpersonal: "pt_interpersonal",
  Intrigue: "pt_intrigue",
  Lore: "pt_lore",
  Supernatural: "pt_supernatural",
};

export const CraftingPerks: Perk[] = [
  new Perk(
    "perk-crafting-area-of-expertise",
    "Area of Expertise",
    PerkTypeIds.Crafting,
    CraftingPerkDescriptions.AreaOfExpertise,
  ),
  new Perk(
    "perk-crafting-expert-artisan",
    "Expert Artisan",
    PerkTypeIds.Crafting,
    CraftingPerkDescriptions.ExpertArtisan,
  ),
  new Perk(
    "perk-crafting-handy",
    "Handy",
    PerkTypeIds.Crafting,
    CraftingPerkDescriptions.Handy,
  ),
  new Perk(
    "perk-crafting-improvisation-creation",
    "Improvisation Creation",
    PerkTypeIds.Crafting,
    CraftingPerkDescriptions.ImprovisationCreation,
  ),
  new Perk(
    "perk-crafting-inspired-artisan",
    "Inspired Artisan",
    PerkTypeIds.Crafting,
    CraftingPerkDescriptions.InspiredAction,
  ),
  new Perk(
    "perk-crafting-traveling-artisan",
    "Traveling Artisan",
    PerkTypeIds.Crafting,
    CraftingPerkDescriptions.TravelingArtisan,
  ),
];

export const ExplorationPerks: Perk[] = [
  new Perk(
    "perk-exploration-brawny",
    "Brawny",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.Brawny,
  ),
  new Perk(
    "perk-exploration-camouflage-hunter",
    "Camouflage Hunter",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.CamouflageHunter,
  ),
  new Perk(
    "perk-exploration-danger-sense",
    "Danger Sense",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.DangerSense,
  ),
  new Perk(
    "perk-exploration-friend-catapult",
    "Friend Catapult",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.FriendCatapult,
  ),
  new Perk(
    "perk-exploration-ive-got-you",
    "I've Got You!",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.IveGotYou,
  ),
  new Perk(
    "perk-exploration-monster-whisperer",
    "Monster Whisperer",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.MonsterWhisperer,
  ),
  new Perk(
    "perk-exploration-put-your-back-into-it",
    "Put Your Back Into It!",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.PutYourBackIntoIt,
  ),
  new Perk(
    "perk-exploration-team-leader",
    "Team Leader",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.TeamLeader,
  ),
  new Perk(
    "perk-exploration-teamwork",
    "Teamwork",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.Teamwork,
  ),
  new Perk(
    "perk-exploration-wood-wise",
    "Wood Wise",
    PerkTypeIds.Exploration,
    ExplorationPerkDescriptions.WoodWise,
  ),
];

export const InterpersonalPerks: Perk[] = [
  new Perk(
    "perk-interpersonal-charming-liar",
    "Charming Liar",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.CharmingLiar,
  ),
  new Perk(
    "perk-interpersonal-dazzler",
    "Dazzler",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.Dazzler,
  ),
  new Perk(
    "perk-interpersonal-engrossing-monologue",
    "Engrossing Monologue",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.EngrossingMonologue,
  ),
  new Perk(
    "perk-interpersonal-harmonizer",
    "Harmonizer",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.Harmonizer,
  ),
  new Perk(
    "perk-interpersonal-lie-detector",
    "Lie Detector",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.LieDetector,
  ),
  new Perk(
    "perk-interpersonal-open-book",
    "Open Book",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.OpenBook,
  ),
  new Perk(
    "perk-interpersonal-pardon-my-friend",
    "Pardon My Friend",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.PardonMyFriend,
  ),
  new Perk(
    "perk-interpersonal-power-player",
    "Power Player",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.PowerPlayer,
  ),
  new Perk(
    "perk-interpersonal-so-tell-me",
    "So Tell Me...",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.SoTellMe,
  ),
  new Perk(
    "perk-interpersonal-spot-the-tell",
    "Spot the Tell",
    PerkTypeIds.Interpersonal,
    InterpersonalPerkDescriptions.SpotTheTell,
  ),
];

export const IntriguePerks: Perk[] = [
  new Perk(
    "perk-intrigue-criminal-contacts",
    "Criminal Contacts",
    PerkTypeIds.Intrigue,
    IntriguePerkDescriptions.CriminalContacts,
  ),
  new Perk(
    "perk-intrigue-forgettable-face",
    "Forgettable Face",
    PerkTypeIds.Intrigue,
    IntriguePerkDescriptions.ForgettableFace,
  ),
  new Perk(
    "perk-intrigue-gum-up-the-works",
    "Gum Up the Works",
    PerkTypeIds.Intrigue,
    IntriguePerkDescriptions.GumUpTheWorks,
  ),
  new Perk(
    "perk-intrigue-lucky-dog",
    "Lucky Dog",
    PerkTypeIds.Intrigue,
    IntriguePerkDescriptions.LuckyDog,
  ),
  new Perk(
    "perk-intrigue-master-of-disguise",
    "Master of Disguise",
    PerkTypeIds.Intrigue,
    IntriguePerkDescriptions.MasterOfDisguise,
  ),
  new Perk(
    "perk-intrigue-slipped-lead",
    "Slipped Lead",
    PerkTypeIds.Intrigue,
    IntriguePerkDescriptions.SlippedLead,
  ),
];

export const LorePerks: Perk[] = [
  new Perk(
    "perk-lore-but-i-know-who-does",
    "But I Know Who Does",
    PerkTypeIds.Lore,
    LorePerkDescriptions.ButIKnowWhoDoes,
  ),
  new Perk(
    "perk-lore-eidetic-memory",
    "Eidetic Memory",
    PerkTypeIds.Lore,
    LorePerkDescriptions.EideticMemory,
  ),
  new Perk(
    "perk-lore-expert-sage",
    "Expert Sage",
    PerkTypeIds.Lore,
    LorePerkDescriptions.ExpertSage,
  ),
  new Perk(
    "perk-lore-ive-read-about-this-place",
    "I've Read About This Place",
    PerkTypeIds.Lore,
    LorePerkDescriptions.IveReadAboutThisPlace,
  ),
  new Perk(
    "perk-lore-linguist",
    "Linguist",
    PerkTypeIds.Lore,
    LorePerkDescriptions.Linguist,
  ),
  new Perk(
    "perk-lore-polymath",
    "Polymath",
    PerkTypeIds.Lore,
    LorePerkDescriptions.Polymath,
  ),
  new Perk(
    "perk-lore-specialist",
    "Specialist",
    PerkTypeIds.Lore,
    LorePerkDescriptions.Specialist,
  ),
  new Perk(
    "perk-lore-traveling-sage",
    "Traveling Sage",
    PerkTypeIds.Lore,
    LorePerkDescriptions.TravelingSage,
  ),
];

export const SupernaturalPerks: Perk[] = [
  new Perk(
    "perk-supernatural-arcane-trick",
    "Arcane Trick",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.ArcaneTrick,
  ),
  new Perk(
    "perk-supernatural-creature-sense",
    "Creature Sense",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.CreatureSense,
  ),
  new Perk(
    "perk-supernatural-familiar",
    "Familiar",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.Familiar,
  ),
  new Perk(
    "perk-supernatural-invisible-force",
    "Invisible Force",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.InvisibleForce,
  ),
  new Perk(
    "perk-supernatural-psychic-whisper",
    "Psychic Whisper",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.PsychicWhisper,
  ),
  new Perk(
    "perk-supernatural-ritualist",
    "Ritualist",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.Ritualist,
  ),
  new Perk(
    "perk-supernatural-thingspeaker",
    "Thingspeaker",
    PerkTypeIds.Supernatural,
    SupernaturalPerkDescriptions.Thingspeaker,
  ),
];

export const Perks: Perk[] = [
  ...CraftingPerks,
  ...ExplorationPerks,
  ...InterpersonalPerks,
  ...IntriguePerks,
  ...LorePerks,
  ...SupernaturalPerks,
];

export const PerkTypeInstances = [
  new PerkType(
    PerkTypeIds.Crafting,
    "Crafting",
    CraftingPerks.map((p) => p.id),
  ),
  new PerkType(
    PerkTypeIds.Exploration,
    "Exploration",
    ExplorationPerks.map((p) => p.id),
  ),
  new PerkType(
    PerkTypeIds.Interpersonal,
    "Interpersonal",
    InterpersonalPerks.map((p) => p.id),
  ),
  new PerkType(
    PerkTypeIds.Intrigue,
    "Intrigue",
    IntriguePerks.map((p) => p.id),
  ),
  new PerkType(
    PerkTypeIds.Lore,
    "Lore",
    LorePerks.map((p) => p.id),
  ),
  new PerkType(
    PerkTypeIds.Supernatural,
    "Supernatural",
    SupernaturalPerks.map((p) => p.id),
  ),
];
