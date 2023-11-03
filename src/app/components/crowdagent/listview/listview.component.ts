import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UsertitlesI } from 'src/app/models/user-titles';
import { Pique, PiqueI } from 'src/app/models/pique-model';
import { jobCardsData } from 'src/app/shared/data/data/job-search/job-search';
import { TitlesService } from 'src/app/shared/services/titles.service';
import { getDatabase, ref, set } from 'firebase/database'
import { PiquesService } from 'src/app/shared/services/piques.service';

@Component({
  selector: 'app-title-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
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

  constructor(
    public config: NgbRatingConfig,
    private authService: AuthService,
    private titleService: TitlesService,
    private piqueService: PiquesService,
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
  }

  pique(data: any): void {
    var index = 0
    for (var entry of this.titleData) {
      if (data === entry) {
        break
      }
      index++
    }
    this.titleData.splice(index, 1)
    this.lastpage = Math.ceil(this.titleData.length / this.maxItems)

    const pique = new Pique(data)
    const piquesRef = ref(this.db, `piques/${this.uid}/${data.projectUid}`)
    set(piquesRef, pique);

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
}
