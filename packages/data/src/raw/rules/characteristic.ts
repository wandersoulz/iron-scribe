import { Characteristic, CharacteristicName } from "@iron-scribe/model";

export const Characteristics: Characteristic[] = Object.values(CharacteristicName).map((characteristicName) => 
    new Characteristic(`characteristic-${characteristicName.toLowerCase()}`, characteristicName)
);

export function getCharacteristic(name: CharacteristicName): Characteristic {
    return Characteristics.find(charactistic => charactistic.name == name)!;
}
