import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Menu } from 'src/app/shared/services/nav.service';
import { VerticalNavService } from 'src/app/shared/services/vertical-nav.service';
import { FeatherIconsComponent } from '../../feather-icons/feather-icons.component';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  standalone: true,
  imports: [
    CommonModule
    , FormsModule
    , RouterLink
    , SvgIconComponent
    , FeatherIconsComponent
  ],
})
export class BookmarkComponent {

  public menuItems: Menu[] = [];
  public items: Menu[] = [];
  public bookmarkItems: Menu[] = [];
  public text: string = "";

  public bookmarkFlip = false;
  public bookmark = false;

  public open = false;
  public searchResult = false;
  public searchResultEmpty = false;
  constructor(public navServices: VerticalNavService) { }

  ngOnInit(): void {
    this.navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
      this.items.filter((items) => {
        if (items.bookmark) {
          this.bookmarkItems.push(items);
        }
        if (!items.children) return false;
        items.children.filter((subItems) => {
          if (subItems.bookmark) {
            this.bookmarkItems.push(subItems);
          }
        });
        return;
      });
    });
  }
  ToggleSearch() {
    this.open = !this.open;
    this.removeFix();
  }

  openBookMark() {
    this.bookmark = !this.bookmark;
  }

  flipBookMark() {
    this.bookmarkFlip = !this.bookmarkFlip;
  }

  searchTerm(term: string) {
    term ? this.addFix() : this.removeFix();
    if (!term) {
      this.open = false;
      return (this.menuItems = []);
    }
    const items: Menu[] = [];
    term = term.toLowerCase();
    this.items.filter((menuItems: Menu) => {
      if (!menuItems?.title) return false;
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === "link") {
        items.push(menuItems);
      }
      if (!menuItems.children) {
        return false;
      }
      menuItems.children.filter((subItems: any) => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === "link") {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) {
          return false;
        }
        subItems.children.filter((suSubItems: any) => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
        });
        return;
      });
      this.checkSearchResultEmpty(items);
      return (this.menuItems = items);
    });
    return;
  }
  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length) {
      this.searchResultEmpty = true;
    } else {
      this.searchResultEmpty = false;
    }
  }

  addFix() {
    this.searchResult = true;
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
  }

  addToBookmark(items: Menu) {
    const index = this.bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      this.bookmarkItems.push(items);
      this.text = "";
    } else {
      this.bookmarkItems.splice(index, 1);
      items.bookmark = false;
    }
  }
}
