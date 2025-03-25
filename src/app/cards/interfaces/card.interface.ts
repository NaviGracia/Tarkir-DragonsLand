export interface Card{
  name: string;
  imageUrl: string | undefined,
  power: number;
  cost: number;
  description: string,
  variants: Variant[];
  abilities: Ability[];
  serie: SeriesDefKey;
}

export interface Variant{
  vname: string;
  card: string;
  rarity: ArtVariantRarityDefKey | null;
  source: ArtVariantSourceDefKey | null;
  imageUrl: string;
}

export interface Ability{
  id: number;
  name: string;
  description: null | string;
}

export enum ArtVariantRarityDefKey {
  Rare = "Rare",
  Spotlight = "Spotlight",
  SuperRare = "SuperRare",
  Ultimate = "Ultimate",
}

export enum ArtVariantSourceDefKey {
  Album = "Album",
  Bundle = "Bundle",
  ConquestShop = "ConquestShop",
  GeneralPool = "GeneralPool",
  Promo = "Promo",
  SeasonPass = "SeasonPass",
  SpotlightCache = "SpotlightCache",
  TokenShop = "TokenShop",
}

export enum SeriesDefKey {
  Recruit = "Recruit",
  SeasonPass = "SeasonPass",
  Series1 = "Series1",
  Series2 = "Series2",
  Series3 = "Series3",
  Series4 = "Series4",
  Series5 = "Series5",
  Starter = "Starter",
}
