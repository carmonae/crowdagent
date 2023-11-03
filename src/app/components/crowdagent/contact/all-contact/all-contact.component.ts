import { Component, Input, Output, OnInit } from '@angular/core';
import { PiqueI } from 'src/app/models/pique-model';
import { PiquesService } from 'src/app/shared/services/piques.service';
import * as Data from '../../../../shared/data/data/contacts/all-contact'

@Component({
  selector: 'app-all-contact',
  templateUrl: './all-contact.component.html',
  styleUrls: ['./all-contact.component.scss']
})
export class AllContactComponent implements OnInit {



  @Input() user: string | undefined
  @Input() tags: string[] = []
  @Output() selectedata!: PiqueI

  public allTitles: PiqueI[] = [];

  public thispage: number = 1
  public nextpage: number = this.thispage + 1
  public pageafternext: number = this.nextpage + 1
  public currentPage: number = 1
  public lastpage: number = 1
  public maxItems = 5
  public nextItem = 0

  constructor(private piqueService: PiquesService) {
  }

  ngOnInit(): void {

    /*
    const getstatus = this.allcontactData.filter((data) => {
      return data.status === true
    })
    const getstatusData = getstatus[0]
    this.selectedstatus = getstatusData.status
     
    this.selectedstatus = true
    */

    var _this = this
    this.piqueService.getPiques(this.user!)
      .subscribe({
        next(piques) {
          console.log('got piques:', piques)
          _this.allTitles = piques
          _this.lastpage = Math.ceil(_this.allTitles.length / _this.maxItems)

        },
        error(msg) {
          console.log(msg)
        },
        complete() {
          console.log('getPiques finished')
        }
      });


  }


  getData(id: string | undefined) {

    const getselectedData = this.allTitles.filter((data) => {
      return data.projectUid === id;
    })

    this.selectedata = getselectedData[0];
    console.log(id, this.selectedata)

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