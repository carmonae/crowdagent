export interface listingTypograhyUL{
    data : string;
}

export interface orderList{
    dt : string;
    dd : string;
}

export interface textColor{
    line : string;
    addClass : string;
}

export interface blockQuotes{
    desc : string;
    author : string;
    class : string;
}

export const listingTypograhyULData : listingTypograhyUL[] = [
    { data : 'One who looks on the bright side of things'},
    { data : 'One who does something not professionally but for pleasure' },
    { data : 'A person who knows everything' },
    { data : 'A handwriting that cannot be read' },
    { data : 'One who looks on the bright side of things' },
    { data : 'A sound that cannot be heard' },
    { data : 'The study of ancient writing and scriptures' },
    { data : 'The study of rocks and soil' },
    { data : 'creates more sophisticated capabilities for a web page to use coding language.' },
    { data : 'Maintaining contact and communicating clearly are also essential. possess abilities for a designer' },
]

export const orderListData : orderList[] = [
    {
        dt : 'The way to get started is to quit talking and begin doing.',
        dd : '-Walt Disney',
    },
    {
        dt : "Life is what happens when you're busy making other plans.",
        dd : '-John Lennon',
    },
    {
        dt : 'Whoever is happy will make others happy too.',
        dd : '-Anne Frank',
    },
    {
        dt : 'Life is either a daring adventure or nothing at all.',
        dd : '-Helen Keller',
    },
    {
        dt : 'The purpose of our lives is to be happy.',
        dd : '-Dalai Lama',
    },
]

export const textColorData : textColor[] = [
    {
       line: "Primary",
       addClass: "txt-primary"
    },
    {
       line: "Secondary",
       addClass: "txt-secondary"
    },
    {
       line: "Success",
       addClass: "txt-success"
    },
    {
       line: "Info",
       addClass: "txt-info"
    },
    {
       line: "Warning",
       addClass: "txt-warning"
    },
    {
       line: "Danger",
       addClass: "txt-danger"
    },
    {
       line: "Dark",
       addClass: "txt-dark"
    },
    {
       line: "Success",
       addClass: "txt-success"
    },
 ]

 export const blockQuotesData : blockQuotes[] = [
    {
        desc : 'The only impossible journey is the one you never begin.',
        author : 'Tony Robbins',
        class : 'text-start',
    },
    {
        desc : 'In this life we cannot do great things. We can only do small things with great love.',
        author : 'Mother Teresa',
        class : 'text-center',
    },
    {
        desc : 'Live in the sunshine, swim the sea, drink the wild air.',
        author : 'Ralph Waldo Emerson',
        class : 'text-end',
    },
 ]
