import { Component } from '@angular/core';

@Component({
  selector: 'app-login-with-two-image',
  templateUrl: './login-with-two-image.component.html',
  styleUrls: ['./login-with-two-image.component.scss']
})
export class LoginWithTwoImageComponent {

  public show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  showPassword() {
    this.show = !this.show;
  }
  
}
