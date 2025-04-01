import { ColorIdentity, Legalities, MagicAbilities, PurchaseUrls, Rarity, Watermark } from "./raw-card.interfaces";

export interface Card{
  id: string;
  name: string;
  pngUrl: string;
  manaCost: string;
  type: string;
  power?: string;
  toughness?: string;
  effect?: string;
  loyalty?: string;
  colors: ColorIdentity[];
  colorIdentity: ColorIdentity[];
  skills: MagicAbilities[];
  producedMana?: ColorIdentity[];
  legalities: Legalities;
  rarity: Rarity;
  artist: string;
  prices: { [key: string]: null | string };
  purchaseUrl: PurchaseUrls;
  clan?: Watermark;
}

