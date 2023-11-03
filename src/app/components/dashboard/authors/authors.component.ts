import { Component } from '@angular/core';
import { abstractPiquesData, manuscriptsPiquesData, titlePiquesData } from 'src/app/shared/data/data/default-dashboard/default-dashboard';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {

  public totalOrderData = abstractPiquesData;
  public totalProductsData = manuscriptsPiquesData;
  public totalUserData = titlePiquesData;

}
