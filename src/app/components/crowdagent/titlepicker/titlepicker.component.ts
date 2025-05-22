import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { Pique } from '@app/models/pique-model';
import { Userprofile } from '@app/models/user-profile';
import { UsertitlesI } from '@app/models/user-titles';
import { PiqueTitlesDataTableComponent } from '@app/shared/component/pique-titles-data-table/pique-titles-data-table.component';
import { PiquedTitlesType } from '@app/shared/data/data/default-dashboard/piqued-titles-mock-data';
import { jobCardsData } from '@app/shared/data/data/job-search/job-search';
import { AgePipe } from '@app/shared/pipes/age.pipe';
import { PiquesService } from '@app/shared/services/piques.service';
import { TitlesService } from '@app/shared/services/titles.service';
import { PiquedTitleTablesService } from '@app/util/piqued-tables.util';
import { KeycloakProfile } from 'keycloak-js';
import { Observable } from 'rxjs';
import Swiper from 'swiper';
import { SwiperModule } from 'swiper/angular';

export interface ExtendedKeycloakProfile extends KeycloakProfile {
  attributes?: { [key: string]: string };
}

@Component({
  selector: 'app-titlepicker',
  templateUrl: './titlepicker.component.html',
  styleUrls: ['./titlepicker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    AgePipe,
    PiqueTitlesDataTableComponent,
  ],
  providers: [DecimalPipe],
  schemas: [],
})
export class TitlePickerComponent {
  @ViewChild('swiper') swiper!: Swiper;
  public cardData = jobCardsData[0];

  private profilePromise!: Promise<KeycloakProfile>;
  public myprofile = new Userprofile();
  public isReady = false;

  public titles$: Observable<PiquedTitlesType[]>;
  public total$: Observable<number>;

  public passTableName: string = 'Passed Titles';
  public piqueTableName: string = 'PiQued Titles';

  uid: string | undefined;

  centerBooks: PiquedTitlesType[] = [
    {
      id: '1',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: '1984',
      subtitle: 'George Orwell',
      score: 99,
      datePublished: '1949',
    },
    {
      id: '2',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'Brave New World',
      subtitle: 'Aldous Huxley',
      score: 93,
      datePublished: '1932',
    },
    {
      id: '3',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'To Kill a Mockingbird',
      subtitle: 'Harper Lee',
      score: 85,
      datePublished: '1960',
    },
    {
      id: '4',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'The Great Gatsby 1',
      subtitle: 'F. Scott Fitzgerald',
      score: 79,
      datePublished: '1925',
    },
    {
      id: '5',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'The Great Gatsby 2',
      subtitle: 'F. Scott Fitzgerald',
      score: 79,
      datePublished: '1925',
    },
    {
      id: '6',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'The Great Gatsby 3',
      subtitle: 'F. Scott Fitzgerald',
      score: 79,
      datePublished: '1925',
    },
    {
      id: '7',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'The Great Gatsby 3',
      subtitle: 'F. Scott Fitzgerald',
      score: 79,
      datePublished: '1925',
    },
    {
      id: '8',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'The Great Gatsby 3',
      subtitle: 'F. Scott Fitzgerald',
      score: 79,
      datePublished: '1925',
    },
    {
      id: '9',
      img: 'assets/images/dashboard-2/selling/01.png',
      title: 'The Great Gatsby 3',
      subtitle: 'F. Scott Fitzgerald',
      score: 79,
      datePublished: '1925',
    },
  ];
  notInterested: PiquedTitlesType[] = [];
  interested: PiquedTitlesType[] = [];

  serviceTable1 = new PiquedTitleTablesService(
    new DecimalPipe('en'),
    this.notInterested
  );
  serviceTable2 = new PiquedTitleTablesService(
    new DecimalPipe('en'),
    this.interested
  );

  public allTitles: UsertitlesI[] = [];

  constructor(
    private authService: AuthService,
    private titlesService: TitlesService,
    private piqueService: PiquesService,
    private NgZone: NgZone
  ) {
    this.titles$ = this.serviceTable1.titles$;
    this.total$ = this.serviceTable1.total$;
    console.log('titles$', this.titles$);

    this.uid = this.authService.getUid();
  }

  ngOnInit(): void {
    this.getProfile();
    console.log('uid=', this.myprofile.uid);

    var _this = this;
    this.titlesService.getTitles().subscribe({
      next(projects) {
        console.log('got projects:', projects);
        _this.allTitles = projects;
        for (let i = 0; i < _this.allTitles.length; i++) {
          _this.centerBooks.push({
            id: _this.allTitles[i].projectUid!,
            img: 'assets/images/dashboard-2/selling/01.png',
            title: _this.allTitles[i].title,
            subtitle: _this.allTitles[i].subtitle,
            score: _this.allTitles[i].scoreA,
            datePublished: _this.allTitles[i].datePublish,
          });
        }
        console.log('centerBooks', _this.centerBooks);
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getPiques finished');
      },
    });
  }

  ngAfterViewInit(): void {}

  getProfile(): void {
    this.profilePromise = this.authService.loadUserProfile();
    this.profilePromise
      .then((profile) => {
        this.myprofile.uid = profile.id!;
        this.myprofile.firstname = profile.firstName!;
        this.myprofile.lastname = profile.lastName!;
        this.myprofile.email = profile.email!;
        this.myprofile.phone = (
          profile as ExtendedKeycloakProfile
        ).attributes?.['phone'][0]!;
        this.isReady = true;
      })
      .catch((error) => {
        console.error('Error loading user profile:', error);
      });
  }

  onPass() {
    console.log('onPass', this.swiper);
    this.notInterested.push(this.centerBooks[0]);
    this.centerBooks.splice(0, 1);
    this.serviceTable1.thedata = this.notInterested;
  }

  onPique() {
    console.log('onPique', this.swiper);
    this.interested.push(this.centerBooks[0]);
    this.centerBooks.splice(0, 1);
    this.serviceTable2.thedata = this.interested;
  }

  onSwipe(swiper: Swiper, collection: string) {
    // direction "next" means swiped left
    const direction = swiper.swipeDirection;
    if (direction === 'next') {
      this.onPass();
    } else if (direction === 'prev') {
      this.onPique();
    }
  }

  onSlideChange([swiper]: Swiper[], collection: string) {
    this.NgZone.run(() => {
      this.onSwipe(swiper, collection);
    });
  }

  moveToPass(id: string) {
    console.log('move to pass', id, this.interested);
    this.interested.map((elem: PiquedTitlesType, i: number) => {
      elem.id == id && this.notInterested.push(elem);
    });
    this.removeItemFrom(id, this.interested);
    this.serviceTable1.thedata = this.notInterested;
    this.serviceTable2.thedata = this.interested;
  }

  moveToPique(id: string) {
    console.log('move to pique', id, this.notInterested, this.interested);
    this.notInterested.map((elem: PiquedTitlesType, i: number) => {
      elem.id == id && this.interested.push(elem);
    });
    this.removeItemFrom(id, this.notInterested);
    this.serviceTable1.thedata = this.notInterested;
    this.serviceTable2.thedata = this.interested;
  }

  removeItemFrom(id: string, collection: PiquedTitlesType[]) {
    console.log('remove item', id);
    collection.map((elem: PiquedTitlesType, i: number) => {
      elem.id == id && collection.splice(i, 1);
    });
  }

  removeItem(id: string) {
    console.log('remove item', id);
    this.notInterested.map((elem: PiquedTitlesType, i: number) => {
      elem.id == id && this.removeItemFrom(id, this.notInterested);
    });
    this.interested.map((elem: PiquedTitlesType, i: number) => {
      elem.id == id && this.removeItemFrom(id, this.interested);
    });
    this.serviceTable1.thedata = this.interested;
    this.serviceTable2.thedata = this.notInterested;
  }

  onDonePiquing() {
    console.log('onDonePiquing', this.allTitles);
    var idsOfInterest = new Set<string>();
    for (let i = 0; i < this.interested.length; i++) {
      idsOfInterest.add(this.interested[i].id);
    }

    for (let i = 0; i < this.allTitles.length; i++) {
      if (idsOfInterest.has(this.allTitles[i].projectUid!)) {
        console.log('onDonePiquing', this.allTitles[i]);
        let newPique = new Pique(this.allTitles[i]);
        this.piqueService.addPique(this.myprofile.uid!, newPique);
        this.titlesService.incrementTitleScoreT(this.allTitles[i].projectUid!);
      }
    }
    this.interested = [];
  }
}
