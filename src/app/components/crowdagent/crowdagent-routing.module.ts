import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ListviewComponent } from './listview/listview.component';
import { ReviewListComponent } from './reviewlist/review-list.component';
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
      {
        path: 'listreviews',
        component: ReviewListComponent,
        data: {
          title: 'List Reviews',
          breadcrumb: 'List Reviews',
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
