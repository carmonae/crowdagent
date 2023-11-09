export interface TitleFilterI {
    search: {
        pattern: string,
        by: string[]
    },
    genre: string,
    format: string,
    age: string
}

export class TitleFilter implements TitleFilterI {

    public search: {
        pattern: '',
        by: []
    }
    public genre: string = ''
    public format: string = ''
    public age: string = ''

    constructor() {
        this.search = { 'pattern': '', 'by': [] }
        this.genre = ''
        this.format = ''
        this.age = ''
    }
}