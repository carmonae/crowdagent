import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { Pique } from '@app/models/pique-model';
import { TitleFilterI } from '@app/models/titleFilter-model';
import { UsertitlesI } from '@app/models/user-titles';
import { jobCardsData } from '@app/shared/data/data/job-search/job-search';
import { AgePipe } from '@app/shared/pipes/age.pipe';
import { PiquesService } from '@app/shared/services/piques.service';
import { ScoresService } from '@app/shared/services/scores-service.service';
import { TitlesService } from '@app/shared/services/titles.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { TitleFilterComponent } from '../title-filter/title-filter.component';
@Component({
    selector: 'app-title-listview',
    templateUrl: './listview.component.html',
    styleUrls: ['./listview.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        AgePipe,
        TitleFilterComponent
    ]
})
export class ListviewComponent implements OnInit {

  public titleData: UsertitlesI[] = [];
  public filterData: UsertitlesI[] = this.titleData;
  public txtColor: string = "txt-info";
  public cardData = jobCardsData[0];
  private uid: string | undefined;
  private db = getDatabase()

  public thispage: number = 1
  public nextpage: number = this.thispage + 1
  public pageafternext: number = this.nextpage + 1
  public currentPage: number = 1
  public lastpage: number = 1
  public maxItems = 5
  public nextItem = 0
  public toast = false
  public toastMsg = 'Piqued'
  public piques: number = 0;

  constructor(
    public config: NgbRatingConfig,
    private authService: AuthService,
    private titleService: TitlesService,
    private piqueService: PiquesService,
    private scoreService: ScoresService,
    private router: Router) {

    config.max = 5;
    config.readonly = true;
    this.uid = authService.getUid()
  }

  ngOnInit(): void {
    var _this = this
    this.titleService.getTitles()
      .subscribe({
        next(titles) {

          console.log('titles b4 filter:', titles)
          // Now that we have all available titles, lets remove the titles
          // the reader has already piqued
          var filteredTitles: any = []
          _this.piqueService.getPiques(_this.uid!)
            .subscribe({
              next(piques) {
                // remove titles that user already expressed interest in
                filteredTitles = titles.filter((title) => {
                  const p = piques.find((pique) => { return title.projectUid === pique.projectUid })
                  return p === undefined // didnt find the title among the ones that piqued the user interest
                })

                _this.titleData = _this.filterData = filteredTitles
                _this.lastpage = Math.ceil(_this.titleData.length / _this.maxItems)
                console.log('titles after filter:', _this.titleData)
              }
            })

        },
        error(msg) {
          console.log(msg)
        },
        complete() {
          console.log('getTiles finished', _this.titleData)
        }
      });

    this.getPiquesLeft()

  }

  getPiquesLeft(): void {
    const dbRef = ref(this.db);
    get(child(dbRef, `users/account/${this.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.exportVal())
        this.piques = snapshot.val()['piques']
      }
      else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }

  pique(data: any): void {

    this.toast = true
    this.toastMsg = `${data.title} placed in your pique list.`

    let _this = this
    setTimeout(function () {
      _this.toast = false
    }, 4000)

    var index = 0
    for (var entry of this.titleData) {
      if (data === entry) {
        break
      }
      index++
    }
    this.titleData.splice(index, 1)
    this.lastpage = Math.ceil(this.titleData.length / this.maxItems)

    const newPique = new Pique(data)
    const piquesRef = ref(this.db, `piques/${this.uid}/${data.projectUid}`)
    set(piquesRef, newPique);

    this.scoreService.incrementTitleScore(this.uid, data.userUid, data.projectUid)
    this.getPiquesLeft()
  }


  toastClose(): void {
    this.toast = false
  }

  gotoPage(page: number): void {

    if (page > this.currentPage && page > this.pageafternext) {
      this.thispage += 1
      this.nextpage = this.thispage + 1
      this.pageafternext = this.nextpage + 1
    }
    else if (page < this.currentPage && page < this.thispage) {
      this.thispage -= 1
      this.nextpage = this.thispage + 1
      this.pageafternext = this.nextpage + 1
    }
    this.currentPage = page
    this.nextItem = (this.currentPage - 1) * this.maxItems
  }

  filter(event: TitleFilterI): void {
    console.log('list-view filter event:', event)

    this.filterData = this.titleData.filter((title) => {

      var result: any = false;

      if (event.search.pattern == '' && event.genre == '' && event.format == '') {
        result = true
      }
      else {
        if (event.search.pattern != '') {
          const regExp = new RegExp(event.search.pattern.toLowerCase())
          if (event.search.by.includes('By Title')) {
            result = regExp.test(title.title.toLowerCase())
          }
          if (event.search.by.includes('By Subtitle')) {
            result = result || regExp.test(title.subtitle.toLowerCase())
          }

        }
        if (event.genre != '') {
          title.genre == event.genre
        }

        if (event.format != '') {
          title.format == event.format
        }
      }
      return result
    })

  }
}
