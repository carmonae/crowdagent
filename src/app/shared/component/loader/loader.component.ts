import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [],
})
export class LoaderComponent {
  
  public show: boolean = true;

  constructor() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  ngOnInit() {
  }
}
