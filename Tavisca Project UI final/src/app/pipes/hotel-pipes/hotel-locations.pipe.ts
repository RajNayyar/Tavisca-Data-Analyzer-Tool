import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hotelLocations'
})
export class HotelLocationsPipe implements PipeTransform {
   transform(items: any[], searchTerm: string): any[] {
       if(!items) 
          return [];
       if(!searchTerm)
          return [];
       searchTerm = searchTerm.toLowerCase();
       return items.filter( it => {
            return it.toLowerCase().includes(searchTerm);
    });
   }
}
