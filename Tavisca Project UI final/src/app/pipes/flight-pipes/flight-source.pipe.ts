import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightSource'
})
export class FlightSourcePipe implements PipeTransform {
    transform(items: any[], sourceTerm: string): any[] {
        if(!items)
           return [];
        if(!sourceTerm) 
           return [];
        sourceTerm = sourceTerm.toLowerCase();
        return items.filter( it => {
            return it.toLowerCase().includes(sourceTerm);
    });
   }
}
