import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    if (typeof value === 'object' && value !== null) {
      let keyArr: any[] = Object.keys(value),
        dataArr = [];

      keyArr.forEach((key: any) => {
        if (typeof value[key] === 'object' && value[key] !== null) {
          value[key].name = key;
          dataArr.push(value[key]);
        } else {
          let temp = value[key];
          value[key] = {
            name: key,
            value: temp
          }
          dataArr.push(value[key]);
        }

      });

      return dataArr;
    } else {
      return [];
    }

  }

}
