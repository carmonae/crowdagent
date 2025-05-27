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
          breadcrumb: 'TitleListview',
        },
      },
      {
        path: 'reviewpiques',
        component: ContactComponent,
        data: {
          title: 'My Piques',
          breadcrumb: 'ReviewPiques',
        },
      },
      {
        path: 'piquetitle',
        component: TitlePickerComponent,
        data: {
          title: 'My Piques',
          breadcrumb: 'PiqueTitle',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdagentRoutingModule {}
