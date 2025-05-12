import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterSimpleComponent } from './register/register-simple.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterSimpleComponent,
        data: {
          title: 'Create Account',
          breadcrumb: 'Register',
          role: 'anyone'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Reset Password',
          breadcrumb: 'ForgotPassword',
          role: 'anyone'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
