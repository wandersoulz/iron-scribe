import {
  StatDynamicValueType,
  RegistryName,
  Career,
  NumericValue,
  ModifierValue,
  Feature,
  FeatureChoiceRegistryValue,
  FeatureChoice,
  FeatureChoiceStaticValue,
  Modifier,
  StringValue,
} from "@iron-scribe/model";
import { SkillGroupIds, Skills } from "../../../skills/core/skills";
import { PerkTypeIds } from "../perks/perks";

export const Laborer: Career = {
  id: "career-laborer",
  name: "Laborer",
  description:
    "You worked as a farmer, builder, clothes washer, forester, miner, or some other profession engaged in hard manual labor.",
  type: "career",
  wealth: 0,
  renown: 0,
  projectPoints: 120,
  modifiers: [
    {
      modifierType: "stat",
      operation: "bonus",
      target: "project_points",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 120,
          returnType: "number",
        } as unknown as NumericValue,
      } as unknown as ModifierValue,
    } as Modifier,
    {
      modifierType: "list",
      operation: "add",
      target: "skills",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: Skills.find((skill) => skill.name === "Endurance")!,
          returnType: "string",
        } as unknown as StringValue,
      } as unknown as ModifierValue,
    } as Modifier,
    {
      modifierType: "list",
      operation: "add",
      target: "skills",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-laborer-skill-1",
        },
      },
    },
    {
      modifierType: "list",
      operation: "add",
      target: "skills",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-laborer-skill-2",
        },
      },
    },
    {
      modifierType: "list",
      operation: "add",
      target: "languages",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-laborer-language",
        },
      },
    },
    {
      modifierType: "list",
      operation: "add",
      target: "perks",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-laborer-perk",
        },
      },
    },
  ],
  choices: [
    {
      id: "choice-laborer-inciting-incident",
      name: "Inciting Incident",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-laborer-inviting-incident-static-values",
        type: "static",
        contents: [
          {
            id: "laborer-ii-1",
            name: "Deep Sentinel",
            description:
              "Spending your days cleaning and maintaining the sewers \
doesn't make you many friends. But you found companionship among the \
rats. You fought the monsters that hunted your friends, and which others \
ignored. After making the sewers safe for the rats, you decided to take your \
talents to the surface and serve other humanoids who might appreciate your \
efforts in the same way.",
            type: "feature",
          } as Feature,
          {
            id: "laborer-ii-2",
            name: "Disaster",
            description:
              "A disaster, such as a cave-in, wildfire, or tidal wave, hit the work \
crew you were in charge of. You saved as many as you could, but the ones \
you couldn’t save weigh heavily on your mind. You took up the life of a hero \
to save as many people as possible, vowing that what happened to you then \
won’t happen again.",
            type: "feature",
          } as Feature,
          {
            id: "laborer-ii-3",
            name: "Embarrassment",
            description:
              "A noble you worked for admonished you publicly for work \
done poorly—and more than once. Finally, you’d had enough. You vowed \
to take up a new path and show this noble you’re far more than what they \
make you out to be.",
            type: "feature",
          } as Feature,
          {
            id: "laborer-ii-4",
            name: "Live the Dream",
            description:
              "You worked with a good friend, and on the job, you would \
always fantasize about what it would be like to hit the road as adventuring \
heroes … someday. You didn’t expect that your friend would fall ill and pass \
away. Now it’s time to live out that dream for both of you.",
            type: "feature",
          } as Feature,
          {
            id: "laborer-ii-5",
            name: "Shining Light",
            description:
              "You kept a lighthouse along the constantly stormy cliffs of \
your village with your mentor. On a clear and sunny day, your mentor \
vanished. Finding only a cryptic notebook filled with his musings on \
the supernatural, you left to find out what really happened. The trail has \
gone cold for now, and you’re helping others find their loved ones in the \
meantime.",
            type: "feature",
          } as Feature,
          {
            id: "laborer-ii-6",
            name: "Slow and Steady",
            description:
              "You labored silently as an uncaring boss drove those \
around you into the ground, pushing you to work harder to lessen the \
burden on your companions. But when the boss pushed too far and killed a \
friend of yours, you led an uprising against them. That was the start of your \
adventuring life.",
            type: "feature",
          } as Feature,
        ],
      } as FeatureChoiceStaticValue,
    } as FeatureChoice,
    {
      id: "choice-laborer-skill-1",
      name: "Laborer Skill 1",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-laborer-skill-1-registry-values",
        type: "registry",
        registryName: RegistryName.Skills,
      } as unknown as FeatureChoiceRegistryValue,
      filter: {
        type: "or",
        queries: [
          { type: "eq", field: "skillGroupId", value: "sg_exploration" },
          { type: "eq", field: "skillGroupId", value: "sg_crafting" },
        ],
      },
    } as FeatureChoice,
    {
      id: "choice-laborer-skill-2",
      name: "Laborer Skill 2",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-laborer-skill-2-registry-values",
        type: "registry",
        registryName: RegistryName.Skills,
      } as unknown as FeatureChoiceRegistryValue,
      filter: {
        type: "or",
        queries: [
          {
            type: "eq",
            field: "skillGroupId",
            value: SkillGroupIds.Exploration,
          },
          {
            type: "eq",
            field: "skillGroupId",
            value: SkillGroupIds.Crafting,
          },
        ],
      },
    } as FeatureChoice,
    {
      id: "choice-laborer-language",
      name: "Language",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-laborer-language-registry-values",
        type: "registry",
        registryName: RegistryName.Languages,
      } as unknown as FeatureChoiceRegistryValue,
    } as FeatureChoice,
    {
      id: "choice-laborer-perk",
      name: "Exploration Perk",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-laborer-perk-registry-values",
        type: "registry",
        registryName: RegistryName.Perks,
      } as unknown as FeatureChoiceRegistryValue,
      filter: {
        type: "eq",
        field: "perkTypeId",
        value: PerkTypeIds.Exploration,
      },
    } as FeatureChoice,
  ],
} as unknown as Career;
