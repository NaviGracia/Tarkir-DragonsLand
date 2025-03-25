import { Ability, Card, Variant } from "../interfaces/card.interface";
import { RawAbility, RawCard, RawVariant } from "../interfaces/rawcard.interfaces";

let firstImage: string = "";

export class CardMapper {
  static mapRawCardsToCardsArray( items: RawCard[]): Card[] {
    return items.map(item => this.mapRawCardToCard(item));
  }

  static mapRawCardToCard( item: RawCard ): Card{
    return{
      name: item.name,
      power: item.power,
      cost: item.cost,
      description: item.description,
      variants: this.mapRawVariantsToVariantsArray(item.variants),
      abilities: this.mapRawAbilitiesToAbilityArray(item.abilities),
      serie: item.seriesDefKey,
      imageUrl: firstImage,
    };
  }

  static mapRawVariantsToVariantsArray( items: RawVariant[] ): Variant[] {
    firstImage = this.mapRawVariantToVariant(items[0]).imageUrl;
    return items.slice(1).map(this.mapRawVariantToVariant);
  }

  static mapRawVariantToVariant( item: RawVariant): Variant {
    return {
      vname: item.key,
      card: item.cardDefKey,
      rarity: item.artVariantRarityDefKey,
      source: item.artVariantSourceDefKey,
      imageUrl: item.imageUrl,

    };
  }

  static mapRawAbilitiesToAbilityArray( items: RawAbility[]): Ability[] {
    return items.map(this.mapRawAbilityToAbility);
  }

  static mapRawAbilityToAbility( item: RawAbility): Ability {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
    };
  }
}
