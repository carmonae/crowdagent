export interface PiquedTitlesType {
    id : number;
    img : string;
    title : string;
    subtitle : string;
    score : number;
    datePublished : string;
}
    
export const piquedTitlesData : PiquedTitlesType[] = [
    {
        id : 1,
        img : "assets/images/dashboard-2/selling/01.png",
        title : 'Samsung TV',
        subtitle : 'Women`s',
        score : 2.6,
        datePublished : '2023-10-01',
    },
    {
        id : 2,
        img : "assets/images/dashboard-2/selling/02.png",
        title : 'Leather Belt',
        subtitle : 'Men’s',
        score : 4.5,
        datePublished : '2023-10-02',
    },
    {
        id : 3,
        img : "assets/images/dashboard-2/selling/03.png",
        title : 'Male Suit',
        subtitle : 'Women’s',
        score : 25.0,
        datePublished : '2023-10-03',
        
    },
    {
        id : 4,
        img : "assets/images/dashboard-2/selling/04.png",
        title : 'Female Dress',
        subtitle : 'Women`s',
        score : 82.0,
        datePublished : '2023-10-04',
    },
]
