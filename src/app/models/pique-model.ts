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
  personalRating: number;
  predictedRating: number;
  tags: TagI[];
  bet: number;
}

export class Pique implements PiqueI {
  public projectUid: undefined;
  public userUid: undefined;
  public title: string = '';
  public subtitle: string = '';
  public datePublish: string = '';
  public level: string = 'title';
  public personalRating: number = 0;
  public predictedRating: number = 0;
  public tags: TagI[] = [];
  public bet: number = 0;

  constructor(title: any) {
    this.projectUid = title.projectUid;
    this.userUid = title.userUid;
    this.title = title.title;
    this.subtitle = title.subtitle;
    this.datePublish = title.datePublish;
    this.personalRating = 0;
    this.predictedRating = 0;
    this.tags = [];
    this.bet = 0;
  }
}
