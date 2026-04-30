import {
  Ancestry,
  LazyRegistry,
  Sourcebook,
  AncestryTrait,
  RegistryName,
  Skill,
  SkillGroup,
  Damage,
  Class,
  ClassFeature,
  Ability,
  Career,
  Perk,
} from "@iron-scribe/model";
import { Marshaller } from "../marshalling/marshaller";

type HeroesSourcebookRegistries = {
  [RegistryName.Ancestries]: LazyRegistry<Ancestry>;
  [RegistryName.AncestryTraits]: LazyRegistry<AncestryTrait>;
  [RegistryName.Skills]: LazyRegistry<Skill>;
  [RegistryName.SkillGroups]: LazyRegistry<SkillGroup>;
  [RegistryName.Damage]: LazyRegistry<Damage>;
  [RegistryName.Classes]: LazyRegistry<Class>;
  [RegistryName.ClassFeatures]: LazyRegistry<ClassFeature>;
  [RegistryName.Abilities]: LazyRegistry<Ability>;
  [RegistryName.Careers]: LazyRegistry<Career>;
  [RegistryName.Perks]: LazyRegistry<Perk>;
};

export const HeroesSourcebook = new Sourcebook<HeroesSourcebookRegistries>(
  "heroes-sourcebook",
  "Heroes (Core Rules)",
  {
    [RegistryName.Ancestries]: new LazyRegistry<Ancestry>(async () => {
      const data = (await import("../raw/core/ancestries")).ancestries;
      return Marshaller.marshallArray(Ancestry, data as Ancestry[]);
    }),
    [RegistryName.AncestryTraits]: new LazyRegistry<AncestryTrait>(async () => {
      const data = (await import("../raw/core/ancestries")).ancestryTraits;
      return Marshaller.marshallArray(AncestryTrait, data);
    }),
    [RegistryName.Skills]: new LazyRegistry<Skill>(async () => {
      const data = (await import("../skills/core/skills")).Skills;
      return data;
    }),
    [RegistryName.SkillGroups]: new LazyRegistry<SkillGroup>(async () => {
      const data = (await import("../skills/core/skills")).SkillGroupInstances;
      return Marshaller.marshallArray(SkillGroup, data);
    }),
    [RegistryName.Damage]: new LazyRegistry<Damage>(async () => {
      const data = (await import("../raw/rules/damage")).Damages;
      return Marshaller.marshallArray(Damage, data);
    }),
    [RegistryName.Classes]: new LazyRegistry<Class>(async () => {
      const data = (await import("../raw/core/classes")).classes;
      return Marshaller.marshallArray(Class, data);
    }),
    [RegistryName.ClassFeatures]: new LazyRegistry<ClassFeature>(async () => {
      const data = (await import("../raw/core/classes")).classFeatures;
      return Marshaller.marshallArray(ClassFeature, data);
    }),
    [RegistryName.Abilities]: new LazyRegistry<Ability>(async () => {
      const data = (await import("../raw/core/classes")).classAbilities;
      return Marshaller.marshallArray(Ability, data);
    }),
    [RegistryName.Careers]: new LazyRegistry<Career>(async () => {
      const data = (await import("../raw/core/careers")).careers;
      return Marshaller.marshallArray(Career, data as Career[]);
    }),
    [RegistryName.Perks]: new LazyRegistry<Perk>(async () => {
      const data = (await import("../raw/core/perks")).perks;
      return Marshaller.marshallArray(Perk, data as Perk[]);
    }),
  },
);
