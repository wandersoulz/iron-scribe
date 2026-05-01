import { ChoiceProvider } from "../choice-provider";
import { BaseFeature, CharacteristicFeature } from "../feature";
import { Hero } from "../../hero/hero";
import { Modifier } from "../../modifiers/modifier";
import {
  StatDynamicValueType,
  NumericValue,
} from "../../modifiers/dynamic-value";
import { ModifierValue } from "../../modifiers/modifier";

export class CharacteristicArrayProvider implements ChoiceProvider {
  resolve(config: Record<string, any>, hero: Hero): BaseFeature[] {
    const { sourceChoiceId, characteristic } = config;
    if (!sourceChoiceId || !characteristic) return [];

    // 1. Find the selection for the array choice
    const arraySelection = (hero.reference.selections || []).find(
      (s) => s.choiceId === sourceChoiceId,
    );
    if (!arraySelection) return [];

    // 2. Extract values from the selected array
    if (!hero.class) return [];

    const arrayIdx = parseInt(
      arraySelection.selectedOptionId.split("_").pop() || "0",
    );
    const selectedArray = hero.class.characteristicArrays[arrayIdx];
    if (!selectedArray) return [];

    // 3. Find other characteristics' selections to handle uniqueness
    const usedValIndices = (hero.reference.selections || [])
      .filter(
        (s) =>
          s.choiceId.startsWith("choice_char_") &&
          s.choiceId !== `choice_char_${characteristic.toLowerCase()}`,
      )
      .map((s) => {
        const parts = s.selectedOptionId.split("_");
        return parseInt(parts[parts.length - 1]);
      });

    // 4. Create feature options for each value in the array
    return selectedArray
      .map((val, valIdx) => {
        const isUsed = usedValIndices.includes(valIdx);
        if (isUsed) return null;

        const optionId = `feat_char_${characteristic.toLowerCase()}_val_${valIdx}`;

        const feat = new CharacteristicFeature();
        feat.id = optionId;
        feat.name = `${val > 0 ? "+" : ""}${val}`;
        feat.type = "characteristic";
        feat.description = `Assign ${feat.name} to ${characteristic}`;

        // Add the actual modifier
        feat.modifiers = [
          new Modifier(
            "stat",
            "base",
            characteristic.toLowerCase(),
            new ModifierValue({
              type: StatDynamicValueType.LiteralValue,
              value: val,
              returnType: "number",
            } as NumericValue),
          ),
        ];

        return feat;
      })
      .filter((f): f is CharacteristicFeature => !!f);
  }
}
