import { GenreTypes } from "./genreTypes-enum"
import { ProjectStatus } from "./projectStatus"
import { Readership } from "./readership-enum"
import { SizeTypes } from "./sizeTypes-enum"
import { WritingType } from "./writingType-enum"


export interface UserprojectI {
    projectUid: string | undefined
    name: string,
    dateCreated: Date | undefined,
    title: string,
    subtitle: string,
    readership: Readership,
    format: WritingType,
    genre: GenreTypes,
    size: SizeTypes,
    dateStart: string,
    dateEnd: string,
    datePublish: string,
    abstract: string,
    manuscriptPath: string,
    fileName: string;
    fileUid: string | undefined;
    url: string;
    status: ProjectStatus,
    scoreT: number,
    scoreA: number,
    scoreM: number
}

export const UserprojectDefault: UserprojectI = {
    projectUid: undefined,
    name: '',
    dateCreated: new Date(),
    title: '',
    subtitle: '',
    readership: Readership.PUBLIC,
    format: WritingType.BOOK,
    genre: GenreTypes.NONFICTION,
    size: SizeTypes.MEDIUM,
    dateStart: '2023-10-30',
    dateEnd: '2023-10-30',
    datePublish: '',
    abstract: '',
    manuscriptPath: '',
    fileName: '<NONE>',
    fileUid: undefined,
    url: '',
    status: ProjectStatus.CREATED,
    scoreT: 0,
    scoreA: 0,
    scoreM: 0

}
export const UserprojectMockData: UserprojectI[] = [
    {
        projectUid: undefined,
        name: 'First Book',
        dateCreated: new Date(),
        title: 'Identity',
        subtitle: 'Restoring the Image of God on the Mind of Man',
        readership: Readership.PUBLIC,
        format: WritingType.BOOK,
        genre: GenreTypes.NONFICTION,
        size: SizeTypes.MEDIUM,
        dateStart: '2023-10-30',
        dateEnd: '2023-10-30',
        datePublish: '',
        abstract: '',
        manuscriptPath: '',
        fileName: 'Identity v2.pdf',
        fileUid: undefined,
        url: '',
        status: ProjectStatus.PUBLISHED,
        scoreT: 1231,
        scoreA: 1020,
        scoreM: 53120
    },
    {
        projectUid: undefined,
        name: 'Second Book',
        dateCreated: new Date(),
        title: 'Rethinking Self-Esteem',
        subtitle: 'A better way of seeing yourself',
        readership: Readership.PUBLIC,
        format: WritingType.BOOK,
        genre: GenreTypes.NONFICTION,
        size: SizeTypes.MEDIUM,
        dateStart: '2023-10-30',
        dateEnd: '2023-10-30',
        datePublish: '',
        abstract: '',
        manuscriptPath: '',
        fileName: 'Identity v2.pdf',
        fileUid: undefined,
        url: '',
        status: ProjectStatus.CREATED,
        scoreT: 1231,
        scoreA: 1020,
        scoreM: 53120
    },
    {
        projectUid: undefined,
        name: 'Apologetics',
        dateCreated: new Date(),
        title: 'The Atheists Predicament',
        subtitle: 'Coming to terms with the materialist world model',
        readership: Readership.PUBLIC,
        format: WritingType.BOOK,
        genre: GenreTypes.NONFICTION,
        size: SizeTypes.MEDIUM,
        dateStart: '2023-10-30',
        dateEnd: '2023-10-30',
        datePublish: '',
        abstract: '',
        manuscriptPath: '',
        url: '',
        fileName: 'Identity v2.pdf',
        fileUid: undefined,
        status: ProjectStatus.CREATED,
        scoreT: 1231,
        scoreA: 1020,
        scoreM: 53120
    },
    {
        projectUid: undefined,
        name: 'Own Your Person',
        dateCreated: new Date(),
        title: 'The Cain Effect',
        subtitle: "Own who you are",
        readership: Readership.PUBLIC,
        format: WritingType.BOOK,
        genre: GenreTypes.NONFICTION,
        size: SizeTypes.MEDIUM,
        dateStart: '2023-10-30',
        dateEnd: '2023-10-30',
        datePublish: '',
        abstract: '',
        manuscriptPath: '',
        url: '',
        fileName: 'Identity v2.pdf',
        fileUid: undefined,
        status: ProjectStatus.PARKED,
        scoreT: 1231,
        scoreA: 1020,
        scoreM: 53120
    },
]

export class Userproject implements UserprojectI {

    projectUid: undefined
    public name: string = ''
    public dateCreated: Date | undefined
    public title: string = ''
    public subtitle: string = ''
    public readership: Readership = Readership.PUBLIC
    public format: WritingType = WritingType.BOOK
    public genre: GenreTypes = GenreTypes.FICTION
    public size: SizeTypes = SizeTypes.LARGE
    public dateStart: string = '2023-10-30'
    public dateEnd: string = '2023-10-30'
    public datePublish: string = ''
    public abstract: string = ''
    public manuscriptPath: string = ''
    public fileName = 'Identity v2.pdf'
    public fileUid: string | undefined = undefined
    public url = ''
    public status: ProjectStatus = ProjectStatus.CREATED
    public scoreT: number = 0
    public scoreA: number = 0
    public scoreM: number = 0

    constructor(project: UserprojectI = UserprojectDefault) {
        projectUid: undefined
        this.name = project.name
        this.dateCreated = project.dateCreated
        this.title = project.title
        this.subtitle = project.subtitle
        this.readership = project.readership
        this.format = project.format
        this.genre = project.genre
        this.size = project.size
        this.dateStart = project.dateStart
        this.dateEnd = project.dateEnd
        this.datePublish = project.datePublish
        this.abstract = project.abstract
        this.manuscriptPath = project.manuscriptPath
        this.fileName = project.fileName
        this.fileUid = project.fileUid
        this.url = project.url
        this.status = project.status
        this.scoreT = project.scoreT
        this.scoreA = project.scoreA
        this.scoreM = project.scoreM
    }
}