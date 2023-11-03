export interface userInformation {
    id : number;
    img : string;
    name : string;
    country : string;
    email : string;
    status : string;
    statusColor : string;
    role : string;
}
export const UserInformationData : userInformation[] = [
    {
        id : 1,
        img : 'assets/images/dashboard/user/07.jpg',
        name : "Dmitriy Groshev",
        country : "United Kingdom",
        email : "hello123@dribbble.com",
        status : "Invited",
        statusColor : "font-primary",
        role : "Interface Designer",
    },
    {
        id : 2,
        img : 'assets/images/dashboard/user/08.jpg',
        name : "Patrick Beverley",
        country : "Australia",
        email : "beverley.lac@gmail.com",
        status : "Active",
        statusColor : "font-secondary",
        role : "Interface Designer",
    },
    {
        id : 3,
        img : 'assets/images/dashboard/user/05.jpg',
        name : "William Barton",
        country : "Netherlands",
        email : "barton-will@gmail.com",
        status : "Active",
        statusColor : "font-secondary",
        role : "Backend Engineer",
    },
    {
        id : 4,
        img : 'assets/images/dashboard/user/06.jpg',
        name : "Kevin Greem",
        country : "United Kingdom",
        email : "green4502@gmail.com",
        status : "Invited",
        statusColor : "font-primary",
        role : "Project Manager",
    },
    
]