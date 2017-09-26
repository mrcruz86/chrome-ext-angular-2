import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitArray'
})
export class LimitArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let temp = [];
    for (let i = 0, l = args; i < l; i++) {
      if (value[i]) {
        temp.push(value[i]);
      }
    }
    return temp;
  }

}
