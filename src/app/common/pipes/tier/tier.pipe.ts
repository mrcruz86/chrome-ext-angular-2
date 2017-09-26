import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tier'
})
export class TierPipe implements PipeTransform {

  transform(value: number, spend: boolean, letter: boolean): string {

    let tier = '';

    switch (value) {
      case 1:
        if (spend) {
          tier = '$500K+';
        }
        if (letter) {
          tier += ' A';
        }
        return tier;
      case 2:
        if (spend) {
          tier = '$100K+';
        }
        if (letter) {
          tier += ' B';
        }
        return tier;
      case 3:
        if (spend) {
          tier = '$50K+';
        }
        if (letter) {
          tier += ' C';
        }
        return tier;
      case 4:
        if (spend) {
          tier = '$20K+';
        }
        if (letter) {
          tier += ' D';
        }
        return tier;
      case 5:
        if (spend) {
          tier = '$5,000+';
        }
        if (letter) {
          tier += ' E';
        }
        return tier;
      case 6:
        if (spend) {
          tier = '$1,000+';
        }
        if (letter) {
          tier += ' F';
        }
        return tier;
      case 7:
        if (spend) {
          tier = '< $1,000';
        }
        if (letter) {
          tier += ' G';
        }
        return tier;
    }
    if (value) {
      return tier = value.toString();
    } else {
      return '';
    }

  }

}
