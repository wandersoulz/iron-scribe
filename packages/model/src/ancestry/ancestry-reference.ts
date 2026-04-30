export interface AncestryTraitReference {
  traitId: string;
}

export interface AncestryReference {
  ancestryId: string;
  signatureTraits: AncestryTraitReference[];
  purchasedTraits: AncestryTraitReference[];
}
