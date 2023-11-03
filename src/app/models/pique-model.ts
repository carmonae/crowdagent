export interface PiqueI {
    projectUid: string | undefined
    userUid: string | undefined
    title: string,
    subtitle: string,
    datePublish: string
}

export class Pique implements PiqueI {

    public projectUid: undefined
    public userUid: undefined
    public title: string = ''
    public subtitle: string = ''
    public datePublish: string = ''

    constructor(title: any) {
        this.projectUid = title.projectUid
        this.userUid = title.userUid
        this.title = title.title
        this.subtitle = title.subtitle
        this.datePublish = title.datePublish
    }
}