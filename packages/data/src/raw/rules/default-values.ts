import { Sizes, SizeType } from "./size";

export const HERO_DEFAULTS = {
  speed: 5,
  size: Sizes.find((s) => s.name == SizeType.Medium)!.name,
  stability: 0,
  level: 1,
  wealth: 0,
  renown: 0,
  project_points: 0,
};
