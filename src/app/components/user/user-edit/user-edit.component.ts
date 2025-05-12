import { Component } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    standalone: true,
    imports: [MyProfileComponent, EditProfileComponent]
})
export class UserEditComponent {

}
