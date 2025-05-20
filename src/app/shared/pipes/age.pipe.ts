import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {
  private millisecondsInADay: number = 24 * 60 * 60 * 1000

  transform(value: string): string {
    var age: string = ''
    var date: Date = new Date(value)
    var today: Date = new Date()

    const duration = (today.valueOf() - date.valueOf()) / this.millisecondsInADay
    if (duration < 1) {
      age = "Today"
    }
    else if (duration < 7) {
      age = 'This Week'
    }
    else if (duration < 30) {
      age = 'This Month'
    }
    else if (duration > 30 && duration < 120) {
      age = 'Some Months Ago'
    }
    else if (duration < 365) {
      age = 'This Year'
    }
    else {
      age = 'Over a Year Ago'
    }
    return age;
  }

}
