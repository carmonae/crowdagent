import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserprojectI } from '@app/models/user-project';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TrackOrderComponent implements OnInit {
  private _projectListData!: UserprojectI[] | null;
  public project: UserprojectI | undefined = undefined;

  @Input()
  set projectListData(list: UserprojectI[] | null) {
    this._projectListData = list;
    this.update();
  }

  public projectTimeline = {
    img: 'assets/images/blankBookCover.jpg',
    title: 'Old reis Telephone',
    subtitle: 'Sold by Vingate Techies',
    id: '#BK739200',
    pique: 30,
    createDate: 'Jun20 05:40PM',
    publishDate: 'Jun22 06:30PM',
    endPhaseIDate: 'July 20',
    archiveDate: 'July 3, 2023',
  };

  ngOnInit() {}

  update(id: string | undefined = undefined): void {
    if (id) {
      this.project = this._projectListData?.find(
        (proj, index, obj) => proj.projectUid === id
      );
      this.projectTimeline = {
        img: 'assets/images/blankBookCover.jpg',
        title: this.project!.title,
        subtitle: this.project!.subtitle,
        id: this.project!.projectUid!,
        pique: this.project!.scoreM,
        createDate: this.project!.dateCreated?.toISOString()!,
        publishDate: this.project!.datePublish,
        endPhaseIDate: this.project!.dateEnd,
        archiveDate: this.project!.dateStart,
      };
    }
  }

  didItStart(date: string): boolean {
    var result: boolean = new Date(date).getTime() < new Date().getTime();
    return result;
  }
}
