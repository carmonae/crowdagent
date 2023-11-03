export interface Allcontact{
    id : number,
    status : boolean,
    img : string,
    firstName : string,
    lastName : string,
    gender : string,
    dob : string,
    personality : string,
    city : string,
    mobile : string,
    email : string,
    website : string,
    interest : string
}

export interface addContact{
    fname : string;
    lname : string;
    email : string;
    mobile : string;
}

export const AllcontactData : Allcontact[] = [
    {
        id : 1,
        status : true,
        img : 'assets/images/user/2.png',
        firstName : 'Bucky',
        lastName : 'Barnes',
        gender : 'Male',
        dob : '18 May 1994',
        personality : 'Cool',
        city : 'moline acres',
        mobile : '+0 1800 76855' ,
        email : 'barnes@gmail.com',
        website : 'www.test.com',
        interest : 'photography'
    },
    {
        id : 2,
        status : false,
        img : 'assets/images/user/8.jpg',
        firstName : 'Comeren',
        lastName : 'Diaz',
        gender : 'Female',
        dob : '7 Feb 1995',
        personality : 'Cool',
        city : 'Delhi',
        mobile : '+0 1800 55812',
        email : 'comeren@gmail.com',
        website : 'www.cometest@.com',
        interest : 'sports'
    },
    {
        id : 3,
        status : false,
        img : 'assets/images/user/1.jpg',
        firstName : 'Issa',
        lastName : 'Bell',
        gender : 'Male',
        dob : '20 Jul 1992',
        personality : 'Cool',
        city : 'Mumbai',
        mobile : '+0 1800 87412',
        email : 'issabell@gmail.com',
        website : 'www.belltest@.com',
        interest : 'cooking'
    },
    {
        id : 4,
        status : false,
        img : 'assets/images/user/14.png',
        firstName : 'Andew',
        lastName : 'Jon',
        gender : 'Male',
        dob : '25 Aug 1996',
        personality : 'Cool',
        city : 'Amreli',
        mobile : '+0 1800 79877',
        email : 'andewjon@gmail.com',
        website : 'www.test@.com',
        interest : 'photography'
    },
    {
        id : 5,
        status : false,
        img : 'assets/images/user/5.jpg',
        firstName : 'Jason',
        lastName : 'Borne',
        gender : 'Male',
        dob : '30 Oct 1992',
        personality : 'Cool',
        city : 'Delhi',
        mobile : '+0 1800 11547',
        email : 'jasonb@gmail.com',
        website : 'www.jason@.com',
        interest : 'photography'
    },
    {
        id : 6,
        status : false,
        img : 'assets/images/avtar/11.jpg',
        firstName : 'Monty',
        lastName : 'Carlo',
        gender : 'Male',
        dob : '12 Nov 1994',
        personality : 'Cool',
        city : 'Amreli',
        mobile : '+0 1800 87944',
        email : 'monty@gmail.com',
        website : 'www.mon@.com',
        interest : 'sports'
    },
    {
        id : 7,
        status : false,
        img : 'assets/images/avtar/16.jpg',
        firstName : 'Brock',
        lastName : 'Lee',
        gender : 'Male',
        dob : '8 Dec 1992',
        personality : 'Cool',
        city : 'Ahemdabad',
        mobile : '+0 1800 58712',
        email : 'lee@gmail.com',
        website : 'www.lee.com',
        interest : 'photography'
    }
]
