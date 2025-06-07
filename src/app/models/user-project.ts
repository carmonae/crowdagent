import { GenreTypes, NonFictionSubtypes } from './genreTypes-enum';
import { ProjectStatus } from './projectStatus';
import { Ratings } from './ratings';
import { Readership } from './readership-enum';
import { SizeTypes } from './sizeTypes-enum';
import { WritingType } from './writingType-enum';

export interface UserprojectI {
  projectUid: string | undefined;
  projectname: string;
  penname: string;
  dateCreated: Date | undefined;
  title: string;
  subtitle: string;
  readership: Readership;
  format: WritingType;
  genre: GenreTypes;
  subgenre: any;
  size: SizeTypes;
  dateStart: string;
  dateEnd: string;
  datePublish: string;
  abstract: string;
  coverurl: string;
  abstracturl: string;
  tocurl: string;
  samplechaptersurl: string;
  status: ProjectStatus;
  scoreI: number;
  scoreT: number;
  scoreC: number;
  scoreA: number;
  scoreM: number;
  scoreM2: number;
  ratings: Ratings[];
}

export const UserprojectDefault: UserprojectI = {
  projectUid: undefined,
  projectname: '',
  penname: '',
  dateCreated: new Date(),
  title: '',
  subtitle: '',
  readership: Readership.PUBLIC,
  format: WritingType.BOOK,
  genre: GenreTypes.NONFICTION,
  subgenre: NonFictionSubtypes.PHILOSOPHY,
  size: SizeTypes.MEDIUM,
  dateStart: '2023-10-30',
  dateEnd: '2023-10-30',
  datePublish: '',
  abstract: '',
  coverurl: '',
  abstracturl: '',
  tocurl: '',
  samplechaptersurl: '',
  status: ProjectStatus.DRAFT,
  scoreI: 0,
  scoreT: 0,
  scoreC: 0,
  scoreA: 0,
  scoreM: 0,
  scoreM2: 0,
  ratings: [],
};
export const UserprojectMockData: UserprojectI[] = [
  {
    projectUid: undefined,
    projectname: 'First Book',
    penname: 'Mark Twain',
    dateCreated: new Date(),
    title: 'Identity',
    subtitle: 'Restoring the Image of God on the Mind of Man',
    readership: Readership.PUBLIC,
    format: WritingType.BOOK,
    genre: GenreTypes.NONFICTION,
    subgenre: NonFictionSubtypes.PHILOSOPHY,
    size: SizeTypes.MEDIUM,
    dateStart: '2023-10-30',
    dateEnd: '2023-10-30',
    datePublish: '',
    abstract: '',
    coverurl: '',
    abstracturl: '',
    tocurl: '',
    samplechaptersurl: '',
    status: ProjectStatus.PUBLISHED,
    scoreI: 0,
    scoreT: 1231,
    scoreC: 12,
    scoreA: 1020,
    scoreM: 53120,
    scoreM2: 123,
    ratings: [],
  },
  {
    projectUid: undefined,
    projectname: 'Second Book',
    penname: 'Mark Twain',
    dateCreated: new Date(),
    title: 'Rethinking Self-Esteem',
    subtitle: 'A better way of seeing yourself',
    readership: Readership.PUBLIC,
    format: WritingType.BOOK,
    genre: GenreTypes.NONFICTION,
    subgenre: NonFictionSubtypes.PHILOSOPHY,
    size: SizeTypes.MEDIUM,
    dateStart: '2023-10-30',
    dateEnd: '2023-10-30',
    datePublish: '',
    abstract: '',
    coverurl: '',
    abstracturl: '',
    tocurl: '',
    samplechaptersurl: '',
    status: ProjectStatus.DRAFT,
    scoreI: 0,
    scoreT: 1231,
    scoreC: 12,
    scoreA: 1020,
    scoreM: 53120,
    scoreM2: 123124,
    ratings: [],
  },
  {
    projectUid: undefined,
    projectname: 'Apologetics',
    penname: 'Mark Twain',
    dateCreated: new Date(),
    title: 'The Atheists Predicament',
    subtitle: 'Coming to terms with the materialist world model',
    readership: Readership.PUBLIC,
    format: WritingType.BOOK,
    genre: GenreTypes.NONFICTION,
    subgenre: NonFictionSubtypes.PHILOSOPHY,
    size: SizeTypes.MEDIUM,
    dateStart: '2023-10-30',
    dateEnd: '2023-10-30',
    datePublish: '',
    abstract: '',
    coverurl: '',
    abstracturl: '',
    tocurl: '',
    samplechaptersurl: '',
    status: ProjectStatus.DRAFT,
    scoreI: 0,
    scoreT: 1231,
    scoreC: 12,
    scoreA: 1020,
    scoreM: 53120,
    scoreM2: 53120,
    ratings: [],
  },
  {
    projectUid: undefined,
    projectname: 'Own Your Person',
    penname: 'Mark Twain',
    dateCreated: new Date(),
    title: 'The Cain Effect',
    subtitle: 'Own who you are',
    readership: Readership.PUBLIC,
    format: WritingType.BOOK,
    genre: GenreTypes.NONFICTION,
    subgenre: NonFictionSubtypes.PHILOSOPHY,
    size: SizeTypes.MEDIUM,
    dateStart: '2023-10-30',
    dateEnd: '2023-10-30',
    datePublish: '',
    abstract: '',
    coverurl: '',
    abstracturl: '',
    tocurl: '',
    samplechaptersurl: '',
    status: ProjectStatus.PARKED,
    scoreI: 0,
    scoreT: 1231,
    scoreC: 12,
    scoreA: 1020,
    scoreM: 53120,
    scoreM2: 53120,
    ratings: [],
  },
];

export class Userproject implements UserprojectI {
  projectUid: undefined;
  public projectname: string = '';
  public penname: string = 'Mark Twain';
  public dateCreated: Date | undefined;
  public title: string = '';
  public subtitle: string = '';
  public readership: Readership = Readership.PUBLIC;
  public format: WritingType = WritingType.BOOK;
  public genre: GenreTypes = GenreTypes.FICTION;
  public subgenre: NonFictionSubtypes = NonFictionSubtypes.PHILOSOPHY;
  public size: SizeTypes = SizeTypes.LARGE;
  public dateStart: string = '2023-10-30';
  public dateEnd: string = '2023-10-30';
  public datePublish: string = '';
  public abstract: string = '';
  public coverurl: string = '';
  public abstracturl: string = '';
  public tocurl: string = '';
  public samplechaptersurl: string = '';
  public status: ProjectStatus = ProjectStatus.DRAFT;
  public scoreI: number = 0;
  public scoreT: number = 0;
  public scoreC: number = 0;
  public scoreA: number = 0;
  public scoreM: number = 0;
  public scoreM2: number = 0;
  public ratings: any = [];

  constructor(project: UserprojectI = UserprojectDefault) {
    this.projectUid = undefined;
    this.projectname = project.projectname;
    this.penname = project.penname;
    this.dateCreated = project.dateCreated;
    this.title = project.title;
    this.subtitle = project.subtitle;
    this.readership = project.readership;
    this.format = project.format;
    this.genre = project.genre;
    this.subgenre = project.subgenre;
    this.size = project.size;
    this.dateStart = project.dateStart;
    this.dateEnd = project.dateEnd;
    this.datePublish = project.datePublish;
    this.abstract = project.abstract;
    this.coverurl = project.coverurl;
    this.abstracturl = project.abstracturl;
    this.tocurl = project.tocurl;
    this.samplechaptersurl = project.samplechaptersurl;
    this.status = project.status;
    this.scoreI = project.scoreI;
    this.scoreC = project.scoreC;
    this.scoreT = project.scoreT;
    this.scoreA = project.scoreA;
    this.scoreM = project.scoreM;
    this.scoreM = project.scoreM2;
    this.ratings = [];
  }
}
