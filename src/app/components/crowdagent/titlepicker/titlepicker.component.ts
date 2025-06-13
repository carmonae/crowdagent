import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { Pique } from '@app/models/pique-model';
import { PiquesPerPique } from '@app/models/piquesPerPique';
import { Userprofile } from '@app/models/user-profile';
import { UsertitlesI } from '@app/models/user-titles';
import { PiqueTitlesDataTableComponent } from '@app/shared/component/pique-titles-data-table/pique-titles-data-table.component';
import {
  crossFadeData,
  crossFadeOptions,
} from '@app/shared/data/data/bonus-ui/owl-carousel';
import { PiquedTitlesType } from '@app/shared/data/data/default-dashboard/piqued-titles-mock-data';
import { jobCardsData } from '@app/shared/data/data/job-search/job-search';
import { AgePipe } from '@app/shared/pipes/age.pipe';
import { ImageService } from '@app/shared/services/image.service';
import { PiquesService } from '@app/shared/services/piques.service';
import { ProjectsService } from '@app/shared/services/projects.service';
import { TitlesService } from '@app/shared/services/titles.service';
import { PiquedTitleTablesService } from '@app/util/piqued-tables.util';
import { KeycloakProfile } from 'keycloak-js';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import Swiper from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
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
    CarouselModule,
    SidemenuComponent,
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

  public passTableName: string = 'Titles I Choose to Pass On';
  public piqueTableName: string = 'Titles That PiQued My Interest';

  public myCrossFadeOptions = crossFadeOptions;
  public myCrossFadeData = crossFadeData;
  public piquesPerTitle = PiquesPerPique.TITLE;

  uid: string | undefined;

  centerBooks: PiquedTitlesType[] = [];
  notInterested: PiquedTitlesType[] = [];
  interested: PiquedTitlesType[] = [];
  noMoreBooks: PiquedTitlesType = {
    id: 1,
    uid: '1',
    pid: '1',
    img: 'assets/image/book-gold.png',
    title: 'No More Books',
    subtitle:
      "You've reached the end of  books available for you to pique into",
    datePublished: '',
  };

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
    private router: Router,
    private titlesService: TitlesService,
    private piqueService: PiquesService,
    private projectService: ProjectsService,
    private NgZone: NgZone,
    private imgService: ImageService
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
    var alreadyPiqued: string[] = [];
    this.piqueService.getPiques(this.uid!).subscribe({
      next(piques) {
        console.log('titlepicker.ngoninit got piques', piques);
        alreadyPiqued = piques
          .map((item) => item.projectUid)
          .filter((uid): uid is string => uid !== undefined);
      },
      error(msg) {
        console.log('error:', msg);
      },
      complete() {
        // get titles that have been published
        _this.titlesService.getTitles().subscribe({
          next(projects) {
            console.log('got projects:', projects);

            // consider projects that are not already piqued
            _this.allTitles = projects.filter(
              (item) => !alreadyPiqued.includes(item.projectUid!)
            );

            for (let i = 0; i < _this.allTitles.length; i++) {
              _this.centerBooks.push({
                id: i,
                uid: _this.allTitles[i].userUid!,
                pid: _this.allTitles[i].projectUid!,
                img:
                  _this.allTitles[i].coverurl != ''
                    ? _this.allTitles[i].coverurl
                    : 'assets/image/book-gold.png',
                title: _this.allTitles[i].title,
                subtitle: _this.allTitles[i].subtitle,
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
    this.projectService.incrementTitleScoreI(
      this.centerBooks[0].uid,
      this.centerBooks[0].pid
    );
    this.notInterested.push(this.centerBooks[0]);
    this.serviceTable1.thedata = this.notInterested;
    this.centerBooks.splice(0, 1);
    if (this.centerBooks.length == 0) {
      this.centerBooks.push(this.noMoreBooks);
    }
  }

  onPique() {
    console.log('onPique', this.swiper);
    this.projectService.incrementTitleScoreI(
      this.centerBooks[0].uid,
      this.centerBooks[0].pid
    );
    this.interested.push(this.centerBooks[0]);
    this.serviceTable2.thedata = this.interested;
    this.centerBooks.splice(0, 1);
    if (this.centerBooks.length == 0) {
      this.centerBooks.push(this.noMoreBooks);
    }
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
      elem.pid == id && this.notInterested.push(elem);
    });
    this.removeItemFrom(id, this.interested);
    this.serviceTable1.thedata = this.notInterested;
    this.serviceTable2.thedata = this.interested;
  }

  moveToPique(id: string) {
    console.log('move to pique', id, this.notInterested, this.interested);
    this.notInterested.map((elem: PiquedTitlesType, i: number) => {
      elem.pid == id && this.interested.push(elem);
    });
    this.removeItemFrom(id, this.notInterested);
    this.serviceTable1.thedata = this.notInterested;
    this.serviceTable2.thedata = this.interested;
  }

  removeItemFrom(id: string, collection: PiquedTitlesType[]) {
    console.log('remove item', id);
    collection.map((elem: PiquedTitlesType, i: number) => {
      elem.pid == id && collection.splice(i, 1);
    });
  }

  removeItem(id: string) {
    console.log('remove item', id);
    this.notInterested.map((elem: PiquedTitlesType, i: number) => {
      elem.pid == id && this.removeItemFrom(id, this.notInterested);
    });
    this.interested.map((elem: PiquedTitlesType, i: number) => {
      elem.pid == id && this.removeItemFrom(id, this.interested);
    });
    this.serviceTable1.thedata = this.interested;
    this.serviceTable2.thedata = this.notInterested;
  }

  onDonePiquing() {
    console.log('onDonePiquing', this.allTitles);
    var idsOfInterest = new Set<string>();
    for (let i = 0; i < this.interested.length; i++) {
      idsOfInterest.add(this.interested[i].pid);
      this.removeItemFrom(this.interested[i].pid, this.interested);
    }
    console.log('onDonePiquing.idsOfInterest=', idsOfInterest);

    for (let i = 0; i < this.allTitles.length; i++) {
      if (idsOfInterest.has(this.allTitles[i].projectUid!)) {
        console.log('onDonePiquing', this.allTitles[i]);
        let newPique = new Pique(this.allTitles[i]);
        this.piqueService.addPique(this.myprofile.uid!, newPique);
        this.projectService.incrementTitleScoreT(
          this.allTitles[i].userUid!,
          this.allTitles[i].projectUid!,
          this.piquesPerTitle
        );
      }
    }
    this.interested = [];
  }

  onDoneWithPage() {
    this.router.navigate(['dashboard']);
  }

  changeGenre(event:any){}
}
