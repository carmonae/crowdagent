import { TagI } from './tag-interface';

export enum PiqueLevel {
  TITLE = 1,
  TOC = 2,
  ABSTRACT = 3,
  MANUSCRIPT = 4,
}

export interface PiqueI {
  projectUid: string | undefined;
  userUid: string | undefined;
  title: string;
  subtitle: string;
  datePublish: string;
  level: string;
  rating: {
    personalRating: number;
    predictedRating: number;
    bet: number;
  };
  tags: TagI[];
}

export class Pique implements PiqueI {
  public projectUid: undefined;
  public userUid: undefined;
  public title: string = '';
  public subtitle: string = '';
  public datePublish: string = '';
  public level: string = 'title';
  public rating!: {
    personalRating: number;
    predictedRating: number;
    bet: number;
  };
  public tags: TagI[] = [];

  constructor(title: any) {
    this.projectUid = title.projectUid;
    this.userUid = title.userUid;
    this.title = title.title;
    this.subtitle = title.subtitle;
    this.datePublish = title.datePublish;
    this.rating.personalRating = 0;
    this.rating.predictedRating = 0;
    this.rating.bet = 0;
    this.tags = [];
  }
}
