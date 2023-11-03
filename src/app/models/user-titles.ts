import { GenreTypes } from "./genreTypes-enum"
import { ProjectStatus } from "./projectStatus"
import { Readership } from "./readership-enum"
import { SizeTypes } from "./sizeTypes-enum"
import { WritingType } from "./writingType-enum"


export interface UsertitlesI {
    projectUid: string | undefined
    userUid: string | undefined
    title: string,
    subtitle: string,
    readership: Readership,
    format: WritingType,
    genre: GenreTypes,
    size: SizeTypes,
    datePublish: string,
    scoreT: number,
    scoreA: number,
    scoreM: number
}

export const UsertitlesDefault: UsertitlesI = {
    projectUid: undefined,
    userUid: undefined,
    title: '',
    subtitle: '',
    readership: Readership.PUBLIC,
    format: WritingType.BOOK,
    genre: GenreTypes.NONFICTION,
    size: SizeTypes.MEDIUM,
    datePublish: '',
    scoreT: 0,
    scoreA: 0,
    scoreM: 0

}
export const UsertitlesMockData: UsertitlesI[] = [
    {
        projectUid: undefined,
        userUid: undefined,
        title: 'Identity',
        subtitle: 'Restoring the Image of God on the Mind of Man',
        readership: Readership.PUBLIC,
        format: WritingType.BOOK,
        genre: GenreTypes.NONFICTION,
        size: SizeTypes.MEDIUM,
        datePublish: '',
        scoreT: 1231,
        scoreA: 1020,
        scoreM: 53120
    }
]

export class Usertitle implements UsertitlesI {

    public projectUid: string | undefined
    public userUid: string | undefined
    public title: string = ''
    public subtitle: string = ''
    public readership: Readership = Readership.PUBLIC
    public format: WritingType = WritingType.BOOK
    public genre: GenreTypes = GenreTypes.FICTION
    public size: SizeTypes = SizeTypes.LARGE
    public datePublish: string = ''
    public scoreT: number = 0
    public scoreA: number = 0
    public scoreM: number = 0

    constructor(title: any, uid: string | undefined) {
        this.projectUid = title.projectUid
        this.userUid = uid
        this.title = title.title
        this.subtitle = title.subtitle
        this.readership = title.readership
        this.format = title.format
        this.genre = title.genre
        this.size = title.size
        this.datePublish = title.datePublish
        this.scoreT = title.scoreT
        this.scoreA = title.scoreA
        this.scoreM = title.scoreM
    }
}