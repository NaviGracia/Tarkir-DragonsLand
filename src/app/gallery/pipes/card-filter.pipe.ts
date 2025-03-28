import { Pipe, type PipeTransform } from '@angular/core';
import { Card } from '../interfaces/card.interface';

@Pipe({
  name: 'cardFilter',
})
export class CardFilterPipe implements PipeTransform {

  transform(value: Card[], search: string): Card[] {
    if (!search) return value;

    search = search.toLowerCase();

    return value.filter(
      card => card.name.toLowerCase().includes(search)
    )
  }

}
