import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PiqueTitlesDataTableComponent } from '@app/shared/component/pique-titles-data-table/pique-titles-data-table.component';
import { PiquedTitlesType } from '@app/shared/data/data/default-dashboard/piqued-titles-mock-data';
import { jobCardsData } from '@app/shared/data/data/job-search/job-search';
import { AgePipe } from '@app/shared/pipes/age.pipe';
import { PiquedTitleTablesService } from '@app/util/piqued-tables.util';
import { Observable } from 'rxjs';
import Swiper from 'swiper';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-titlepicker',
  templateUrl: './titlepicker.component.html',
  styleUrls: ['./titlepicker.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, SwiperModule, AgePipe, PiqueTitlesDataTableComponent],
  providers: [DecimalPipe],
  schemas: [],
})
export class TitlePickerComponent {

  public cardData = jobCardsData[0];

  public titles$: Observable<PiquedTitlesType[]>;
  public total$: Observable<number>;

  public passTableName: string = 'Passed Titles';
  public piqueTableName: string = 'Piqued Titles';

  centerBooks : PiquedTitlesType[] = [
    { id:1, img:'assets/images/dashboard-2/selling/01.png', title: '1984', subtitle: 'George Orwell', score:99, datePublished:'1949' }, 
    { id:2, img:'assets/images/dashboard-2/selling/01.png', title: 'Brave New World', subtitle: 'Aldous Huxley', score: 93, datePublished:'1932' },
    { id:3, img:'assets/images/dashboard-2/selling/01.png', title: 'To Kill a Mockingbird', subtitle:'Harper Lee', score: 85, datePublished:'1960' },
    { id:4, img:'assets/images/dashboard-2/selling/01.png', title: 'The Great Gatsby 1', subtitle: 'F. Scott Fitzgerald', score: 79, datePublished:'1925' },
    { id:5, img:'assets/images/dashboard-2/selling/01.png', title: 'The Great Gatsby 2', subtitle: 'F. Scott Fitzgerald', score: 79, datePublished:'1925' },
    { id:6, img:'assets/images/dashboard-2/selling/01.png', title: 'The Great Gatsby 3', subtitle: 'F. Scott Fitzgerald', score: 79, datePublished:'1925' },
  ];
  notInterested: PiquedTitlesType[] = [
  ];
  interested: PiquedTitlesType[] = [
  ];

  serviceTable1 = new PiquedTitleTablesService(new DecimalPipe('en'), this.notInterested);
  serviceTable2 = new PiquedTitleTablesService(new DecimalPipe('en'), this.interested);

  ngAfterViewInit(): void {

  };

  constructor(private NgZone: NgZone) {
    this.titles$ = this.serviceTable1.titles$;
    this.total$ = this.serviceTable1.total$;
    console.log('titles$', this.titles$);
  }

  onSwipe(swiper:Swiper, collection: string) {

    var center: any;
    var left: any;
    var right: any;    
  
    if (collection == 'center') {
      center = this.centerBooks;
      left = this.notInterested;
      right = this.interested;
    }
    else if (collection == 'interested') {
      center = this.interested;
      right = this.notInterested;
      left = this.centerBooks;
    } 
    else if (collection == 'notInterested') {
      center = this.notInterested;
      right = this.centerBooks;
      left = this.interested;
    }

    const direction = swiper.swipeDirection;
    // direction "next" means swiped left
    if (direction === 'next') {
      left.push(center[swiper.activeIndex-2]);
      center.splice(swiper.activeIndex-2, 1);
      this.serviceTable1.thedata = left;
    } else if (direction === 'prev') {
      right.push(center[swiper.activeIndex]);
      center.splice(swiper.activeIndex, 1);
      this.serviceTable2.thedata = right;
    }

  }

  onSlideChange([swiper]:Swiper[], collection:string) {
    this.NgZone.run( () => {
      this.onSwipe(swiper, collection);  
    })
  }

  moveToPass(id: number) {
    console.log('move to pass', id, this.interested);
    this.interested.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && this.notInterested.push(elem)})
    this.removeItemFrom(id,this.interested);
  }

  moveToPique(id: number) {
    console.log('move to pique', id);
    this.notInterested.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && this.interested.push(elem)})
    this.removeItemFrom(id,this.notInterested);
  }
  
  removeItemFrom(id: number, collection: PiquedTitlesType[]) {
    console.log('remove item', id);
    collection.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && collection.splice(i,1)})
  }

  removeItem(id: number) {
    console.log('remove item', id);
    this.notInterested.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && this.removeItemFrom(id,this.notInterested)})
    this.interested.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && this.removeItemFrom(id,this.interested)})
  }
}