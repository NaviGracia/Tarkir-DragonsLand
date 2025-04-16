import { RawSet } from "@shared/interfaces/raw-set.interface";
import { Set } from "@shared/interfaces/set.interface";

export class SetMapper {
  //Función diseñada por si se decide escalar a más sets.
  /* static mapRawSetsToSetsArray( items: RawSet[]): Set[] {
    return items.map(item => this.mapRawSetToSet(item));
  } */

  // Mapper: Reducir la longitud del objeto recibido por la api para mayor facilidad de uso y más entendible.
  static mapRawSetToSet( item: RawSet ): Set{
    return{
      icon: item.icon_svg_uri,
      name: item.name,
      codeSet: item.code,
      releaseDate: item.released_at,
      totalCards: item.card_count,
      searchCardsUrl: item.search_uri,
    };
  }
}
