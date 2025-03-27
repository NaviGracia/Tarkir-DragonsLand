import { Card } from "../interfaces/card.interface";
import { RawCard } from "../interfaces/raw-card.interfaces";


export class CardMapper {
  static mapRawCardsToCardsArray( rawCards: RawCard[]): Card[] {
    return rawCards.map(card => this.mapRawCardToCard(card));
  }

  static mapRawCardToCard( card: RawCard ): Card{
    return{
      name: card.name,
      pngUrl: card.image_uris.png,
      manaCost: card.mana_cost,
      type: card.type_line,
      power: card.power,
      toughness: card.toughness,
      effect: card.oracle_text,
      loyalty: card.loyalty,
      colors: card.colors,
      colorIdentity: card.color_identity,
      skills: card.keywords,
      producedMana: card.produced_mana,
      legalities: card.legalities,
      rarity: card.rarity,
      artist: card.artist,
      prices: card.prices,
      purchaseUrl: card.purchase_uris,
      clan: card.watermark,
    };
  }


}
