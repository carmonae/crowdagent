import { Component } from '@angular/core';
import { CommonRegisterFormComponent } from "../common-register-form/common-register-form.component";

@Component({
    selector: 'app-register-simple',
    templateUrl: './register-simple.component.html',
    styleUrls: ['./register-simple.component.scss'],
    standalone: true,
    imports: [CommonRegisterFormComponent]
})
export class RegisterSimpleComponent {

}
