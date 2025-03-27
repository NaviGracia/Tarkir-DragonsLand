export interface RawSet {
  object:       string;
  id:           string;
  code:         string;
  mtgo_code:    string;
  arena_code:   string;
  tcgplayer_id: number;
  name:         string;
  uri:          string;
  scryfall_uri: string;
  search_uri:   string;
  released_at:  Date;
  set_type:     string;
  card_count:   number;
  digital:      boolean;
  nonfoil_only: boolean;
  foil_only:    boolean;
  icon_svg_uri: string;
}
