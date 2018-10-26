import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightDestination'
})
export class FlightDestinationPipe implements PipeTransform {

  transform(items: any[], destinationTerm: string): any[] {
    if(!items) return [];
    if(!destinationTerm) return [];
    destinationTerm = destinationTerm.toLowerCase();
return items.filter( it => {
      return it.toLowerCase().includes(destinationTerm);
    });
   }


}
