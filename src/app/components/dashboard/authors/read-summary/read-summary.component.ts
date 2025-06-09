import { Component, Input } from '@angular/core';
import { UserprojectI } from '@app/models/user-project';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as Chart from '../../../../shared/data/charts/dashboard-charts';

@Component({
  selector: 'app-read-summary',
  templateUrl: './read-summary.component.html',
  styleUrls: ['./read-summary.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class ReadSummaryComponent {
  public timelineChart = Chart.SalesSummary;
  private _projectListData!: UserprojectI[] | null;

  @Input() uid: string | undefined = '';
  @Input()
  set projectListData(list: UserprojectI[] | null) {
    this._projectListData = list;
    this.getTimeline();
  }

  getTimeline() {
    type Entry = [string, string, number]; // [date, book, reader, score]
    type SeriesEntry = [string, number, number]; // [date, number of readers, total score]
    const bookMap: Record<
      string,
      Record<string, { readers: Set<string>; totalScore: number }>
    > = {};

    var data: Entry[] = [];

    for (let project of this._projectListData!) {
      let id: string = project.projectUid!;
      if (project.ratings) {
        for (const key in project.ratings) {
          //console.log(project.ratings[key]);
          try {
            let newDate = new Date(project.ratings[key].timestamp)
              .toISOString()
              .split('T')[0];
            //let reader = project.ratings[key].readerId;
            let reader = (Math.random() * 3 + 1).toString();
            let scoreM2 = project.ratings[key].scoreM2;
            data.push([newDate, reader, scoreM2]);
          } catch (error) {
            console.log(error);
          }
        }
      }

      for (const [date, reader, score] of data) {
        if (!bookMap[id]) bookMap[id] = {};

        if (!bookMap[id][date])
          bookMap[id][date] = { readers: new Set(), totalScore: 0 };

        bookMap[id][date].readers.add(reader);
        bookMap[id][date].totalScore += score;
      }
    }

    const result: Record<string, SeriesEntry[]> = {};
    let bookname: string | undefined;
    for (const book in bookMap) {
      bookname =
        this._projectListData!.find(
          (value, index, obj) => value.projectUid == book
        )?.title +
        '.' +
        book;

      if (bookname) {
        if (!result[bookname!]) {
          result[bookname!] = [];
        }
        for (const day in bookMap[book]) {
          result[bookname].push([
            day,
            bookMap[book][day]['readers'].size,
            bookMap[book][day]['totalScore'],
          ]);
        }
        console.log('result[bookname]=', result[book]);
      }
    }

    console.log(result);

    let series: any[] = [];
    for (const book in result) {
      series.push({ name: book, data: result[book] });
    }
    console.log(series);

    this.timelineChart = {
      ...this.timelineChart,
      ...{
        series: series,
        title: {
          text: '',
          align: 'center',
          offsetY: 272,
          style: {
            fontSize: '16px',
            fontWeight: '400',
            fontFamily: 'Secular One',
            color: '#1F2F3E',
          },
        },
      },
    };
  }
}
