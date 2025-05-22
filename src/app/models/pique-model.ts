import { TagI } from './tag-interface';

export interface PiqueI {
  projectUid: string | undefined;
  userUid: string | undefined;
  title: string;
  subtitle: string;
  datePublish: string;
  level: string;
  tags: TagI[];
}

export class Pique implements PiqueI {
  public projectUid: undefined;
  public userUid: undefined;
  public title: string = '';
  public subtitle: string = '';
  public datePublish: string = '';
  public level: string = 'title';
  public tags: TagI[] = [];

  constructor(title: any) {
    this.projectUid = title.projectUid;
    this.userUid = title.userUid;
    this.title = title.title;
    this.subtitle = title.subtitle;
    this.datePublish = title.datePublish;
    this.tags = [];
  }
}
