import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'phone', standalone: true })
export class PhonePipe implements PipeTransform {
  formatPhoneNumber(s:string) {

    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  transform(val:string, args?: any) {
    var formattedPhone = "";
    try {
      formattedPhone = this.formatPhoneNumber(val)!;
  
    } catch (error) {
      formattedPhone = val;
    }

    if (formattedPhone == null)
      formattedPhone = val;

    return formattedPhone;
  }
}