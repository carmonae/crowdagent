import { Component } from '@angular/core';
import { VerticalNavService } from '../../services/vertical-nav.service';
import { Menu, NavService } from '../../services/nav.service';
import { HideNavScrollService } from '../../services/hide-nav-scroll.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public menus = this.navService.verticalMenuItem;
  public menuItems: Menu[] = [];
  public items: Menu[] = [];

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public open : boolean = false;
  
  constructor(
    public navService: VerticalNavService, 
    public navServices : NavService,
    public hidenav : HideNavScrollService,
    public searchService : SearchService
    ) {
      this.navService.items.subscribe(menuItems => this.items = menuItems);
     }

  openMenu() {
    this.navService.isDisplay = !this.navService.isDisplay;
  }

  languageToggle() {
    this.navServices.language = !this.navServices.language;
  }

  openSearch(){
    this.open = !this.open
  }
  

  searchTerm(term: string){        
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];    
    let items: Menu[] = [];
    term = term.toLowerCase();    
    this.items.filter(menuItems => {
      if (!menuItems?.title) return false
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }      
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
        return
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items      
      return    
    }
    );
    return
    
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas')
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.body.classList.remove('offcanvas')
  }
}

