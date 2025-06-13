import { Component, OnInit } from '@angular/core';
import {
  CrowdAgentStats,
  CrowdAgentStatsI,
} from '@app/models/crowdagentstats-model';
import { CrowdAgentService } from '@app/shared/services/crowdagent.service';
import {
  authorsData,
  booksData,
  freelancersData,
  impressionsData,
  litAgentsData,
  piquesData,
  publishersData,
  ratingsData,
  readersData,
} from 'src/app/shared/data/data/default-dashboard/default-dashboard';
import { CommonDetailsComponent } from '../shared/common-details/common-details.component';
import { ProfileGrettingComponent } from '../shared/profile-gretting/profile-gretting.component';

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  standalone: true,
  imports: [ProfileGrettingComponent, CommonDetailsComponent],
})
export class DashboardDefaultComponent implements OnInit {
  public totalReaders = readersData;
  public totalAuthors = authorsData;
  public totalBooks = booksData;
  public totalLitAgents = litAgentsData;
  public totalPublishers = publishersData;
  public totalFreelancers = freelancersData;
  public totalImpressions = impressionsData;
  public totalPiques = piquesData;
  public totalRatings = ratingsData;

  public greeting: string = "Here's what is the latest stats on Crowd Agent";
  private stats: CrowdAgentStatsI = new CrowdAgentStats();

  constructor(private crowdAgentStats: CrowdAgentService) {}

  ngOnInit() {
    let _this = this;
    this.crowdAgentStats.getCrowdAgentStats().subscribe({
      next(stats) {
        console.log('stats:', stats);
        _this.stats = stats;
        _this.totalReaders.data = stats.readers.toString();
        _this.totalAuthors.data = stats.authors.toString();
        _this.totalBooks.data = stats.books.toString();
        _this.totalLitAgents.data = stats.literaryagents.toString();
        _this.totalPublishers.data = stats.publishers.toString();
        _this.totalFreelancers.data = stats.freelancers.toString();
        _this.totalPiques.data = stats.piques.toString();
        _this.totalImpressions.data = stats.impressions.toString();
        _this.totalRatings.data = stats.ratings.toString();
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getCrowdAgentStats finished');
      },
    });
  }
}
