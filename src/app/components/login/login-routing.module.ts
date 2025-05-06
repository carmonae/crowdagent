import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSimpleComponent } from './register/register-simple.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterSimpleComponent,
        data: {
          title: 'Create Account',
          breadcrumb: 'Register'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Reset Password',
          breadcrumb: 'ForgotPassword'
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
