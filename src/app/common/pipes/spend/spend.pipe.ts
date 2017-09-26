import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spend'
})
export class SpendPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value < 10000) {
      if (value >= 5000) {
        return '$5,000+';
      } else if (value >= 1000) {
        return '$1,000+';
      } else {
        return '<$1,000';
      }
    } else {
      return '$' + (value / 1000).toString() + 'K+';
    }
  }

}
