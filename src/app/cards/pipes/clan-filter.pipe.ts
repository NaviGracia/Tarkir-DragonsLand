import { Pipe, type PipeTransform } from '@angular/core';
import { Card } from '@shared/interfaces/card.interface';


@Pipe({
  name: 'clanFilter',
})
export class ClanFilterPipe implements PipeTransform {

  transform(value: Card[], clan: string): Card[] {
    for
    if()
    switch (clan) {
      case 'abzan':
        return value.sort((a, b) => a.clan.localeCompare(clan)) ?? ;

        case 'canFly':
          return value.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1));

        case 'color':
          return value.sort((a, b) => a.color - b.color);

          case 'creator':
            return value.sort((a, b) => a.creator - b.creator);

      default:
        return value;
    }
  }

}
