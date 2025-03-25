
export interface CardsResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  RawCard[];
}

export interface RawCard {
  key:                   string;
  url:                   string;
  power:                 number;
  cost:                  number;
  name:                  string;
  description:           string;
  variants:              RawVariant[];
  displayImageUrl:       string;
  displayVariant:        RawVariant;
  isCollectable:         boolean;
  isReleased:            boolean;
  abilities:             RawAbility[];
  category:              null | string;
  primaryColor:          string;
  secondaryColor:        string;
  ringColor:             string;
  startsInHand:          boolean;
  turnDrawn:             null;
  cardsShuffledIntoDeck: any[];
  seriesDefKey:          SeriesDefKey;
  seriesLabel:           string;
  shortSeriesLabel:      string;
  deckCodeKey:           string;
}

export interface RawAbility {
  id:          number;
  name:        string;
  description: null | string;
}

export interface RawVariant {
  key:                     string;
  cardDefKey:              string;
  imageUrl:                string;
  url:                     string;
  imageComponents:         ImageComponents;
  cost:                    number;
  power:                   number;
  variantLabel:            null | string;
  artVariantSourceDefKey:  ArtVariantSourceDefKey | null;
  artVariantRarityDefKey:  ArtVariantRarityDefKey | null;
  sourceLabel:             string;
  rarityLabel:             RarityLabel;
  isCardDefDisplayVariant: boolean;
  artists:                 Artist[];
  cardDefSeries:           SeriesDefKey;
  RawAbilityIds:              number[];
  releaseDate:             Date | null;
  isObtainable:            boolean;
  albums:                  Album[];
}

export interface Album {
  key:         string;
  name:        string;
  url:         string;
  albumArtUrl: string;
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

export interface Artist {
  id:         number;
  name:       string;
  artistType: ArtistType;
}

export enum ArtistType {
  Artist = "Artist",
  Colorist = "Colorist",
  Inker = "Inker",
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

export interface ImageComponents {
  foregroundScreenUrl:           null | string;
  renderForegroundOverPowerCost: boolean;
  logoUrl:                       string;
  isCompositeFoilMaskLayer2:     boolean;
  backgroundMaterial:            BackgroundMaterial;
  foregroundLayers:              ForegroundLayer[];
}

export interface BackgroundMaterial {
  layers:   Layer[];
  angle:    number | number;
  offset:   Offset;
  scale:    Offset;
  override: Override | null;
}

export interface Layer {
  layerNumber: number;
  textureUrl:  string;
  scale:       Offset;
  offset:      Offset;
  alpha:       number;
  angle:       number;
  override:    Override | null;
}

export interface Offset {
  x: number;
  y: number;
}

export interface Override {
  layer:     number | null;
  offset:    Offset | null;
  scale:     Offset | null;
  objectFit: null;
  rotate:    null;
  alpha:     null;
}

export interface ForegroundLayer {
  layerNum:   number;
  textureUrl: string;
}

export enum RarityLabel {
  Rare = "Rare",
  SuperRare = "Super Rare",
  Ultimate = "Ultimate",
  Unknown = "Unknown",
}
