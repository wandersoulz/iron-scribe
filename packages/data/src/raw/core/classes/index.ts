import { Ability, ClassFeature, Class } from "@iron-scribe/model";
import { CensorDef, CensorAbilities } from "./censor";

export const classAbilities: Ability[] = [...CensorAbilities];

export const classes: Class[] = [CensorDef];

export const classFeatures: ClassFeature[] = [];
