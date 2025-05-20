import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ListviewComponent } from './listview/listview.component';
import { TitlePickerComponent } from './titlepicker/titlepicker.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'listview',
                component: ListviewComponent,
                data: {
                    title: 'Title List',
                    breadcrumb: 'TitleListview'
                }
            },
            {
                path: 'pique',
                component: ContactComponent,
                data: {
                    title: 'My Piques',
                    breadcrumb: 'Piques'
                }
            },
            {
                path: 'swiper',
                component: TitlePickerComponent,
                data: {
                    title: 'My Piques',
                    breadcrumb: 'Piques'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrowdagentRoutingModule { }
