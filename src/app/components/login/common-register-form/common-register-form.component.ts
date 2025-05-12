import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/service/auth.keycloak.service';

import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
@Component({
    selector: 'app-common-register-form',
    templateUrl: './common-register-form.component.html',
    styleUrls: ['./common-register-form.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FeatherIconsComponent]
})
export class CommonRegisterFormComponent {

  public show: boolean = false
  public loginForm: FormGroup;

  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private password: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  ngOnInit(): void {
  }

  showPassword() {
    this.show = !this.show;
  }

  createAccount() {
    this.email = this.loginForm.value["email"]
    this.password = this.loginForm.value["password"]
    this.firstName = this.loginForm.value['firstName']
    this.lastName = this.loginForm.value['lastName']

    console.log('create account with ', this.email, this.password, this.firstName, this.lastName)
    try {
      this.authService.register(this.email, this.password)
      const fullName = this.firstName + " " + this.lastName
      this.authService.updateProfile(fullName)
      console.log(this.authService.getCurrentUser())
    }
    catch (error) {
      console.log(error)
    }
  }

}
