export interface commonTable {
    id: number;
    img: string;
    fname: string;
    lname: string;
    username: string;
    designation: string;
    company: string;
    language: string;
    badgeColor: string;
    country: string;
    borderColor: string;
    creditVolume: string;
}

export interface inverseTable {
    id: number;
    fname: string;
    lname: string;
    office: string;
    position: string;
    salary: string;
    joinDate: string;
    age: number;
}

export interface hoverableRowHorizontial {
    id: number;
    status: string;
    statusColor: string;
    icon: string;
    signalName: string;
    security: string;
    stage: string;
    schedule: string;
    teamLead: string;
}

export interface caption {
    id: number;
    employeeName: string;
    email: string;
    experience: string;
    sex: string;
    contact: string;
    age: number;
}

export interface headOption {
    id: number;
    fname: string;
    lname: string;
    userName: string;
}

export interface stripeRowInverse {
    id: number;
    dessert: string;
    calories: string;
    fat: string;
    price: number;
}

export interface backpoint {
    id: number;
    name: string;
    orderID: string;
    price: string;
    quantity: string;
    total: string;
}

export interface responsiveLightBg {
    id: number;
    task: string;
    email: string;
    phone: string;
    assign: string;
    date: string;
    price: string;
    status: string;
    statusColor: string;
    progress: number;
}

export interface sizingTable {
    id: number;
    employeeName: string;
    date: string;
    status: string;
    statusColor: string;
    hours: string;
    performance: string;
}

export interface customHoverStriped {
    id: number;
    filmTitle: string;
    released: number;
    studio: string;
    budget: string;
    domesticGross: string;
}

export interface dashedBorder {
    id: number;
    className: string;
    type: string;
    hour: string;
    trainer: string;
    sport: number;
}

export interface country {
    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}

export const commonTableData: commonTable[] = [
    {
        id: 1,
        img: 'assets/images/user/1.jpg',
        fname: 'Ram Jacob',
        lname: 'Wolfe',
        username: 'RamJacob@twitter',
        designation: 'Developer',
        company: 'Apple Inc.',
        language: 'Php',
        badgeColor: 'danger',
        country: 'IND',
        borderColor: 'secondary',
        creditVolume: '3500.00',
    },
    {
        id: 2,
        img: 'assets/images/user/2.jpg',
        fname: 'John Deo',
        lname: 'Gummer',
        username: 'JohnDeo@twitter',
        designation: 'Designer',
        company: 'Hewlett packard',
        language: 'Html',
        badgeColor: 'primary',
        country: 'US',
        borderColor: 'success',
        creditVolume: '2400.00',
    },
    {
        id: 3,
        img: 'assets/images/user/3.jpg',
        fname: 'Elana John',
        lname: 'Cazale',
        username: 'ElanaJohn@twitter',
        designation: 'Designer',
        company: 'Microsoft',
        language: 'Pug',
        badgeColor: 'danger',
        country: 'UK',
        borderColor: 'info',
        creditVolume: '2560.00',
    },
    {
        id: 4,
        img: 'assets/images/user/7.jpg',
        fname: 'Meryl Streep',
        lname: 'Roberts',
        username: 'MerylStreep@twitter<',
        designation: 'Developer',
        company: 'Tata Ltd.',
        language: 'React',
        badgeColor: 'success',
        country: 'IDN',
        borderColor: 'warning',
        creditVolume: '1870.00',
    },
    {
        id: 5,
        img: 'assets/images/user/2.png',
        fname: 'Emma Stone',
        lname: 'Stone',
        username: 'EmmaStone@twitter',
        designation: 'Developer',
        company: 'Wipro Ltd.',
        language: 'Vue',
        badgeColor: 'primary',
        country: 'IRN',
        borderColor: 'danger',
        creditVolume: '4580.00',
    },
    {
        id: 6,
        img: 'assets/images/user/3.png',
        fname: 'Eliana Jons',
        lname: 'Jons',
        username: 'ElianaJons@twitter',
        designation: 'Developer',
        company: 'Info Ltd.',
        language: 'Vue',
        badgeColor: 'success',
        country: 'IRN',
        borderColor: 'light',
        creditVolume: '4580.00',
    },
]

export const inverseTableData: inverseTable[] = [
    {
        id: 1,
        fname: 'Stephan',
        lname: 'Laiten',
        office: 'Tokyo',
        position: 'Accountant',
        salary: '2100.00',
        joinDate: '21/01/2023',
        age: 20,
    },
    {
        id: 2,
        fname: 'Fay',
        lname: 'Van Damme',
        office: 'London',
        position: 'CEO',
        salary: '1420.00',
        joinDate: '14/02/2023',
        age: 22,
    },
    {
        id: 3,
        fname: 'Brevin',
        lname: 'Oleveria',
        office: 'New York',
        position: 'Software Engineer',
        salary: '1340.00',
        joinDate: '04/06/2023',
        age: 18,
    },
    {
        id: 4,
        fname: 'Regina',
        lname: 'Ottandy',
        office: 'France',
        position: 'Pre-sale Support',
        salary: '3400.00',
        joinDate: '10/08/2023',
        age: 25,
    },
    {
        id: 5,
        fname: 'Vani',
        lname: 'Shah',
        office: 'Los Angeles',
        position: 'Senior Developer',
        salary: '3500.00',
        joinDate: '23/07/2023',
        age: 28,
    },
]

export const hoverableRowHorizontialData: hoverableRowHorizontial[] = [
    {
        id: 1,
        status: 'No Signal',
        statusColor: 'success',
        icon: 'alert-triangle',
        signalName: 'Astrid: NE Shared managed',
        security: 'Medium',
        stage: 'Triaged',
        schedule: '0.33',
        teamLead: 'Chase Nguyen',
    },
    {
        id: 2,
        status: 'Offline',
        statusColor: 'danger',
        icon: 'alert-triangle',
        signalName: 'Cosmo: prod shared ares',
        security: 'Huge',
        stage: 'Triaged',
        schedule: '0.39',
        teamLead: 'Brie Furman',
    },
    {
        id: 3,
        status: 'Online',
        statusColor: 'primary',
        icon: 'alert-circle',
        signalName: 'Phoenix: prod shared lyra-lists',
        security: 'Minor',
        stage: 'No Triaged',
        schedule: '3.12',
        teamLead: 'Jeremy Lake',
    },
    {
        id: 4,
        status: 'No Signal',
        statusColor: 'success',
        icon: 'check-circle',
        signalName: 'Astrid: NE Shared managed',
        security: 'Negligible',
        stage: 'Triaged',
        schedule: '13.18',
        teamLead: 'Angelica Howards',
    },
    {
        id: 5,
        status: 'Online',
        statusColor: 'danger',
        icon: 'check-circle',
        signalName: 'Astrid: NE Shared managed',
        security: 'Medium',
        stage: 'No Triaged',
        schedule: '5.33',
        teamLead: 'Diane Okuma',
    },
]

export const captionData: caption[] = [
    {
        id: 1,
        employeeName: 'Elana Robbert',
        email: 'ElanaRob@gmail.com',
        experience: '1 Year',
        sex: 'Male',
        contact: '+91 9789887777',
        age: 28,
    },
    {
        id: 2,
        employeeName: 'Stiphen Deo',
        email: 'Stiphen@yahoo.com',
        experience: '6 Month',
        sex: 'Female',
        contact: '+91 9874563210',
        age: 22,
    },
    {
        id: 3,
        employeeName: 'Genelia Ottre',
        email: 'Genelia@gmail.com',
        experience: '2 Days',
        sex: 'Male',
        contact: '+91 8794562135',
        age: 24,
    },
]

export const headOptionData: headOption[] = [
    {
        id: 1,
        fname: 'Mark',
        lname: 'Otto',
        userName: '@mdo',
    },
    {
        id: 2,
        fname: 'Jacob',
        lname: 'Thornton',
        userName: '@fat',
    },
    {
        id: 3,
        fname: 'Larry',
        lname: 'the Bird',
        userName: '@twitter',
    },
]

export const stripeRowInverseData: stripeRowInverse[] = [
    {
        id: 1,
        dessert: 'KitKat',
        calories: '518',
        fat: '26',
        price: 20,
    },
    {
        id: 2,
        dessert: 'Donut',
        calories: '452',
        fat: '25',
        price: 80,
    },
    {
        id: 3,
        dessert: 'Eclair',
        calories: '262',
        fat: '16',
        price: 10,
    },
]

export const backpointData: backpoint[] = [
    {
        id: 1,
        name: 'Iphone X Grey',
        orderID: 'C12345',
        price: '12550',
        quantity: '1',
        total: '12550',
    },
    {
        id: 2,
        name: 'Titan Watch',
        orderID: 'A14725',
        price: '120',
        quantity: '2',
        total: '250',
    },
    {
        id: 3,
        name: 'Apple Airpods',
        orderID: 'B54213',
        price: '210',
        quantity: '1',
        total: '210',
    },
]

export const responsiveLightBgData: responsiveLightBg[] = [
    {
        id: 1,
        task: 'Web Development',
        email: 'Pixel@efo.com',
        phone: '+91 7874226671',
        assign: 'Mark Jecno',
        date: '12/07/2023',
        price: '2315.00',
        status: 'Pending',
        statusColor: 'danger',
        progress: 75,
    },
    {
        id: 2,
        task: 'Graphic Design',
        email: 'Strap@google.com',
        phone: '+91 8347855785',
        assign: 'Elana John',
        date: '23/08/2023',
        price: '4125.00',
        status: 'Pending',
        statusColor: 'danger',
        progress: 45,
    },
    {
        id: 3,
        task: 'WordPress',
        email: 'Pixelstrap@gmail.com',
        phone: '+91 635609347',
        assign: 'John Deo',
        date: '15/04/2023',
        price: '6123.00',
        status: 'Done',
        statusColor: 'success',
        progress: 100,
    },
]

export const sizingTableData: sizingTable[] = [
    {
        id: 1,
        employeeName: 'Mark Jecno',
        date: '22/08/2023',
        status: 'On leave',
        statusColor: 'danger',
        hours: '0',
        performance: '29/30',
    },
    {
        id: 2,
        employeeName: 'Elana Robbert',
        date: '21/08/2023',
        status: 'Present',
        statusColor: 'success',
        hours: '10',
        performance: '30/30',
    },
    {
        id: 3,
        employeeName: 'John Deo',
        date: '18/08/2023',
        status: 'On leave',
        statusColor: 'danger',
        hours: '8',
        performance: '28/30',
    },
]

export const customHoverStripedData: customHoverStriped[] = [
    {
        id: 1,
        filmTitle: 'Frozen',
        released: 2013,
        studio: 'Disney',
        budget: '150,000,000',
        domesticGross: '400,953,009',
    },
    {
        id: 2,
        filmTitle: 'Minions',
        released: 2015,
        studio: 'Universal',
        budget: '74,000,000',
        domesticGross: '336,045,770',
    },
    {
        id: 3,
        filmTitle: 'Zootopia',
        released: 2016,
        studio: 'Disney',
        budget: '150,000,000',
        domesticGross: '341,268,248',
    },
    {
        id: 4,
        filmTitle: 'Finding Dory',
        released: 2016,
        studio: 'Disney Pixar',
        budget: '175,000,000',
        domesticGross: '486,295,561',
    },
    {
        id: 5,
        filmTitle: 'Toy Story 3',
        released: 2010,
        studio: 'Disney Pixar',
        budget: '200,000,000',
        domesticGross: '415,004,880',
    },
]

export const dashedBorderData: dashedBorder[] = [
    {
        id: 1,
        className: 'Crit Cardio',
        type: 'Gym',
        hour: '9:00 AM - 11:00 AM',
        trainer: 'Aaron Chapman',
        sport: 10,
    },
    {
        id: 2,
        className: 'Zumba Dance',
        type: 'Dance',
        hour: '8:00 AM - 9:00 AM',
        trainer: 'Donna Wilson',
        sport: 12,
    },
    {
        id: 3,
        className: 'Like a butterfly',
        type: 'Boxing',
        hour: '9:00 AM - 10:00 AM',
        trainer: 'Randy Porter',
        sport: 13,
    },
    {
        id: 4,
        className: 'Pilates Reformer',
        type: 'Gym',
        hour: '7:00 AM - 8:30 AM',
        trainer: 'Aaron Chapman',
        sport: 15,
    },
    {
        id: 5,
        className: 'Mind & Body',
        type: 'Yoga',
        hour: '8:00 AM - 9:00 AM',
        trainer: 'Adam Stewart',
        sport: 20,
    },
]

export const countryData: country[] = [
    {
        id: 1,
        name: 'Russia',
        flag: 'f/f3/Flag_of_Russia.svg',
        area: 17075200,
        population: 146989754,
    },
    {
        id: 2,
        name: 'France',
        flag: 'c/c3/Flag_of_France.svg',
        area: 640679,
        population: 64979548,
    },
    {
        id: 3,
        name: 'Germany',
        flag: 'b/ba/Flag_of_Germany.svg',
        area: 357114,
        population: 82114224,
    },
    {
        id: 4,
        name: 'Portugal',
        flag: '5/5c/Flag_of_Portugal.svg',
        area: 92090,
        population: 10329506,
    },
    {
        id: 5,
        name: 'Canada',
        flag: 'c/cf/Flag_of_Canada.svg',
        area: 9976140,
        population: 36624199,
    },
    {
        id: 6,
        name: 'Vietnam',
        flag: '2/21/Flag_of_Vietnam.svg',
        area: 331212,
        population: 95540800,
    },
    {
        id: 7,
        name: 'Brazil',
        flag: '0/05/Flag_of_Brazil.svg',
        area: 8515767,
        population: 209288278,
    },
    {
        id: 8,
        name: 'Mexico',
        flag: 'f/fc/Flag_of_Mexico.svg',
        area: 1964375,
        population: 129163276,
    },
    {
        id: 9,
        name: 'United States',
        flag: 'a/a4/Flag_of_the_United_States.svg',
        area: 9629091,
        population: 324459463,
    },
    {
        id: 10,
        name: 'India',
        flag: '4/41/Flag_of_India.svg',
        area: 3287263,
        population: 1324171354,
    },
    {
        id: 11,
        name: 'Indonesia',
        flag: '9/9f/Flag_of_Indonesia.svg',
        area: 1910931,
        population: 263991379,
    },
    {
        id: 12,
        name: 'Tuvalu',
        flag: '3/38/Flag_of_Tuvalu.svg',
        area: 26,
        population: 11097,
    },
    {
        id: 13,
        name: 'China',
        flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
        area: 9596960,
        population: 1409517397,
    },
]

