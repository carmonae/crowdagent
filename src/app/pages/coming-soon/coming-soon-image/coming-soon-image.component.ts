import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon-image',
  templateUrl: './coming-soon-image.component.html',
  styleUrls: ['./coming-soon-image.component.scss'],
})
export class ComingSoonImageComponent {
  public seconds!: number;
  public interval;

  constructor() {
    this.interval = setInterval(function (this: any) {
      let countDown = new Date('aug 9, 2023 00:00:00').getTime() + 7;
      let now = new Date().getTime();
      let distance = countDown - now;

      this.document
        .querySelectorAll('#days')
        .forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
        });

      this.document
        .querySelectorAll('#hours')
        .forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
        });

      this.document
        .querySelectorAll('#minutes')
        .forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
        });

      this.document
        .querySelectorAll('#seconds')
        .forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor((distance % (1000 * 60)) / 1000);
        });
    }, this.seconds);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
