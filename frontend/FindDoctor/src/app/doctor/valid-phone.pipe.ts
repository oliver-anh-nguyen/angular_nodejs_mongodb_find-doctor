import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validPhone'
})
export class ValidPhonePipe implements PipeTransform {

  transform(value: string): string {
    value = "+1"+ value;
    const countryCodeStr = value.slice(0,2);
    const areaCodeStr = value.slice(2,5);
    const midSectionStr = value.slice(5,8);
    const lastSectionStr = value.slice(8);
    return `Phone: ${countryCodeStr} (${areaCodeStr}) ${midSectionStr}-${lastSectionStr}`;
  }

}
