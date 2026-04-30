import {Size} from "@iron-scribe/model"

export enum SizeType {
  Tiny = "1T",
  Small = "1S",
  Medium = "1M",
  Large = "1L",
  XLarge = "2",
  XXLarge = "3",
  XXXLarge = "4",
}

export const Sizes = Object.values(SizeType).map(
  (sizeType) =>
    ({
      id: `size-${sizeType}`,
      name: sizeType,
    }) as Size,
);
