export interface RawCardResponse {
  object:      string;
  total_cards: number;
  has_more:    boolean;
  next_page:   string;
  data:        RawCard[];
}

export interface RawCard {
  object:            RawCardObject;
  id:                string;
  oracle_id:         string;
  multiverse_ids:    any[];
  tcgplayer_id?:     number;
  cardmarket_id?:    number;
  name:              string;
  lang:              Lang;
  released_at:       Date;
  uri:               string;
  scryfall_uri:      string;
  layout:            Layout;
  highres_image:     boolean;
  image_status:      ImageStatus;
  image_uris:        ImageUris;
  mana_cost:         string;
  cmc:               number;
  type_line:         string;
  oracle_text?:      string;
  loyalty?:          string;
  colors:            ColorIdentity[];
  color_identity:    ColorIdentity[];
  keywords:          MagicAbilities[];
  produced_mana?:    ColorIdentity[];
  legalities:        Legalities;
  games:             Game[];
  reserved:          boolean;
  game_changer:      boolean;
  foil:              boolean;
  nonfoil:           boolean;
  finishes:          Finish[];
  oversized:         boolean;
  promo:             boolean;
  reprint:           boolean;
  variation:         boolean;
  set_id:            string;
  set:               Set;
  set_name:          SetName;
  set_type:          SetType;
  set_uri:           string;
  set_search_uri:    string;
  scryfall_set_uri:  string;
  rulings_uri:       string;
  prints_search_uri: string;
  collector_number:  string;
  digital:           boolean;
  rarity:            Rarity;
  card_back_id:      string;
  artist:            string;
  artist_ids:        string[];
  illustration_id:   string;
  border_color:      BorderColor;
  frame:             string;
  security_stamp?:   SecurityStamp;
  full_art:          boolean;
  textless:          boolean;
  booster:           boolean;
  story_spotlight:   boolean;
  edhrec_rank?:      number;
  prices:            { [key: string]: null | string };
  related_uris:      RelatedUris;
  purchase_uris:     PurchaseUrls;
  power?:            string;
  toughness?:        string;
  watermark?:        Watermark;
  flavor_text?:      string;
  frame_effects?:    FrameEffect[];
  preview?:          Preview;
  all_parts?:        AllPart[];
  card_faces?:       CardFace[];
  penny_rank?:       number;
}

export interface AllPart {
  object:    AllPartObject;
  id:        string;
  component: Component;
  name:      string;
  type_line: string;
  uri:       string;
}

export enum Component {
  ComboPiece = "combo_piece",
  Token = "token",
}

export enum AllPartObject {
  RelatedCard = "related_card",
}

export enum BorderColor {
  Black = "black",
}

export interface CardFace {
  object:           CardFaceObject;
  name:             string;
  mana_cost:        string;
  type_line:        TypeLine;
  oracle_text:      string;
  power?:           string;
  toughness?:       string;
  artist:           string;
  artist_id:        string;
  illustration_id?: string;
}

export enum CardFaceObject {
  CardFace = "card_face",
}

export enum TypeLine {
  CreatureDragon = "Creature — Dragon",
  InstantOmen = "Instant — Omen",
  SorceryOmen = "Sorcery — Omen",
}

export enum ColorIdentity {
  B = "B",
  C = "C",
  G = "G",
  R = "R",
  U = "U",
  W = "W",
}

export enum Finish {
  Foil = "foil",
  Nonfoil = "nonfoil",
}

export enum FrameEffect {
  Enchantment = "enchantment",
  Legendary = "legendary",
}

export enum Game {
  Arena = "arena",
  Mtgo = "mtgo",
  Paper = "paper",
}

export enum ImageStatus {
  HighresScan = "highres_scan",
  Lowres = "lowres",
}

export interface ImageUris {
  small:       string;
  normal:      string;
  large:       string;
  png:         string;
  art_crop:    string;
  border_crop: string;
}

export enum Lang {
  En = "en",
}

export enum Layout {
  Adventure = "adventure",
  Normal = "normal",
  Saga = "saga",
}

export interface Legalities {
  standard:        Alchemy;
  future:          Alchemy;
  historic:        Alchemy;
  timeless:        Alchemy;
  gladiator:       Alchemy;
  pioneer:         Alchemy;
  explorer:        Alchemy;
  modern:          Alchemy;
  legacy:          Alchemy;
  pauper:          Alchemy;
  vintage:         Alchemy;
  penny:           Alchemy;
  commander:       Alchemy;
  oathbreaker:     Alchemy;
  standardbrawl:   Alchemy;
  brawl:           Alchemy;
  alchemy:         Alchemy;
  paupercommander: Alchemy;
  duel:            Alchemy;
  oldschool:       Alchemy;
  premodern:       Alchemy;
  predh:           Alchemy;
}

export enum Alchemy {
  Legal = "legal",
  NotLegal = "not_legal",
}

export enum RawCardObject {
  Card = "card",
}

export interface Preview {
  source:       string;
  source_uri:   string;
  previewed_at: Date;
}

export interface PurchaseUrls {
  tcgplayer:   string;
  cardmarket:  string;
  cardhoarder: string;
}

export enum Rarity {
  Common = "common",
  Mythic = "mythic",
  Rare = "rare",
  Uncommon = "uncommon",
}

export interface RelatedUris {
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks:    string;
  edhrec:                      string;
}

export enum SecurityStamp {
  Oval = "oval",
}

export enum Set {
  Tdm = "tdm",
}

export enum SetName {
  TarkirDragonstorm = "Tarkir: Dragonstorm",
}

export enum SetType {
  Expansion = "expansion",
}

export enum Watermark {
  Abzan = "abzan",
  Jeskai = "jeskai",
  Mardu = "mardu",
  Sultai = "sultai",
  Temur = "temur",
}

export enum MagicAbilities {
  // Confirmed abilities in Tarkir: Dragonstorm
  Deathtouch = "Deathtouch",
  DoubleStrike = "Double Strike",
  Flash = "Flash",
  Flying = "Flying",
  Haste = "Haste",
  Vigilance = "Vigilance",

  // New mechanics introduced in the set
  Bolster = "Bolster",  // Abzan mechanic, interacts with +1/+1 counters
  Flurry = "Flurry",  // Jeskai mechanic (details pending)
  Mobilize = "Mobilize",  // Mardu mechanic (details pending)
  Renew = "Renew",  // Sultai mechanic (details pending)
  Harmonize = "Harmonize",  // Temur mechanic, reduces spell costs from the graveyard
  Omen = "Omen"  // New standalone mechanic (details pending)
}
