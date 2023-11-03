export interface sellingProduct{
    id : number;
    img : string;
    product : string;
    category : string;
    brand : string;
    price : number;
    stock : number;
    rating : string;
    order : number;
    sales : number;
}
export const BestSellingProduct : sellingProduct[] = [
    {
        id : 1,
        img : "assets/images/dashboard-2/selling/01.png",
        product : 'Samsung TV',
        category : 'Women`s',
        brand : 'Richman',
        price : 20,
        stock : 265,
        rating : '2.6 (16)',
        order : 165,
        sales : 35
    },
    {
        id : 2,
        img : "assets/images/dashboard-2/selling/02.png",
        product : 'Leather Belt',
        category : 'Men’s',
        brand : 'Lubhauo',
        price : 16,
        stock : 954,
        rating : '4.5 (16)',
        order : 789,
        sales : 95
    },
    {
        id : 3,
        img : "assets/images/dashboard-2/selling/03.png",
        product : 'Male Suit',
        category : 'Women’s',
        brand : 'Cameron',
        price : 34,
        stock : 123,
        rating : '2.5 (16)',
        order : 348,
        sales : 19
    },
    {
        id : 4,
        img : "assets/images/dashboard-2/selling/04.png",
        product : 'Female Dress',
        category : 'Women`s',
        brand : 'Wilson',
        price : 34,
        stock : 756,
        rating : '2.5 (16)',
        order : 956,
        sales : 20
    },
]
    
