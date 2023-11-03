export interface commonHelperClasses {
    header: string;
    desc: string;
    titleData: titleData[]
}

export interface titleData {
    title: string;
    colClass: string;
    divClass: string;
    data: data[]
}

export interface data {
    text: string;
    textClass: string;
}

export interface images {
    img: string;
    imgClass: string;
    alt : string;
}

export interface commonText{
    header : string;
    desc : string;
    data : data[]
}

export const BorderAndDisplayData: commonHelperClasses[] = [
    {
        header: 'Borders And Displays',
        desc: "Use border utilities to add or remove an element's borders.",
        titleData: [
            {
                title: 'Additive Border',
                colClass: 'col-xl-4 col-sm-6',
                divClass: 'border-wrapper h-100 border',
                data: [
                    {
                        text: '.border',
                        textClass: 'helper-box bg-light border',
                    },
                    {
                        text: '.border-top',
                        textClass: 'helper-box bg-light border-top',
                    },
                    {
                        text: '.border-bottom',
                        textClass: 'helper-box bg-light border-bottom',
                    },
                    {
                        text: '.border-start',
                        textClass: 'helper-box bg-light border-start',
                    },
                    {
                        text: '.border-end',
                        textClass: 'helper-box bg-light border-end',
                    },
                ]
            },
            {
                title: 'Subtractive Border',
                colClass: 'col-xl-4 col-sm-6',
                divClass: 'border-wrapper h-100 border',
                data: [
                    {
                        text: '.border-0',
                        textClass: 'helper-box bg-light border border-0',
                    },
                    {
                        text: '.border-top-0',
                        textClass: 'helper-box bg-light border border-top-0',
                    },
                    {
                        text: '.border-end-0',
                        textClass: 'helper-box bg-light border border-end-0',
                    },
                    {
                        text: '.border-bottom-0',
                        textClass: 'helper-box bg-light border border-bottom-0',
                    },
                    {
                        text: '.border-start-0',
                        textClass: 'helper-box bg-light border border-start-0',
                    },
                ]
            },
            {
                title : 'Additive Radius',
                colClass : 'col-xl-4 col-sm-12',
                divClass : 'border-wrapper h-100 border',
                data : [
                    {
                        text : '.rounded',
                        textClass : 'helper-radius radius-wrapper rounded',
                    },
                    {
                        text : '.rounded-top',
                        textClass : 'helper-radius radius-wrapper rounded-top',
                    },
                    {
                        text : '.rounded-end',
                        textClass : 'helper-radius radius-wrapper rounded-end',
                    },
                    {
                        text : '.rounded-bottom',
                        textClass : 'helper-radius radius-wrapper rounded-bottom',
                    },
                    {
                        text : '.rounded-start',
                        textClass : 'helper-radius radius-wrapper rounded-start',
                    },
                    {
                        text : '.rounded-pill',
                        textClass : 'helper-radius radius-wrapper rounded-pill',
                    },
                    {
                        text : '.rounded-circle',
                        textClass : 'helper-radius radius-wrapper rounded-circle',
                    },
                    {
                        text : '.rounded-0',
                        textClass : 'helper-radius radius-wrapper rounded-0',
                    },
                ]
            }
        ]
    }

]

export const StyleBorderData : commonHelperClasses[] = [
    {
        header : 'Styles In Borders',
        desc : 'Use the different styles of borders like:<code>border radius/border-color/border-width</code>. Use of any components.</p>',
        titleData : [
            {
                title : 'Custom Border-radius Class',
                colClass : 'col-xl-3 col-sm-6',
                divClass : 'border-wrapper h-100 alert-light-light dark-helper',
                data : [
                    {
                        text : '.b-r-0',
                        textClass : 'helper-box b-r-0 bg-light border'
                    },
                    {
                        text : '.b-r-1',
                        textClass : 'helper-box b-r-1 bg-light border',
                    },
                    {
                        text : '.b-r-2',
                        textClass : 'helper-box b-r-2 bg-light border',
                    },
                    {
                        text : '.b-r-3',
                        textClass : 'helper-box b-r-3 bg-light border',
                    },
                    {
                        text : '.b-r-4',
                        textClass : 'helper-box b-r-4 bg-light border',
                    },
                    {
                        text : '.b-r-5',
                        textClass : 'helper-box b-r-5 bg-light border',
                    },
                    {
                        text : '.b-r-6',
                        textClass : 'helper-box b-r-6 bg-light border',
                    },
                    {
                        text : '.b-r-7',
                        textClass : 'helper-box b-r-7 bg-light border',
                    },
                    {
                        text : '.b-r-8',
                        textClass : 'helper-box b-r-8 bg-light border',
                    },
                    {
                        text : '.b-r-9',
                        textClass : 'helper-box b-r-9 bg-light border',
                    },
                    {
                        text : '.b-r-10',
                        textClass : 'helper-box b-r-10 bg-light border',
                    },
                ]
            },
            {
                title : 'Border Color',
                colClass : 'col-xl-3 col-sm-6',
                divClass : 'border-wrapper h-100 alert-light-light dark-helper',
                data : [
                    {
                        text : '.border-primary',
                        textClass : 'helper-box border-primary border'
                    },
                    {
                        text : '.border-secondary',
                        textClass : 'helper-box border-secondary border'
                    },
                    {
                        text : '.border-success',
                        textClass : 'helper-box border-success border'
                    },
                    {
                        text : '.border-danger',
                        textClass : 'helper-box border-danger border'
                    },
                    {
                        text : '.border-warning',
                        textClass : 'helper-box border-warning border'
                    },
                    {
                        text : '.border-info',
                        textClass : 'helper-box border-info border'
                    },
                    {
                        text : '.border-dark',
                        textClass : 'helper-box border-dark border'
                    },
                ],
            },
            {
                title : 'Border-Width',
                colClass : 'col-xl-3 col-sm-6',
                divClass : 'border-wrapper h-100 alert-light-light dark-helper',
                data : [
                    {
                        text : '.border-1',
                        textClass : 'helper-box border-1 border',
                    },
                    {
                        text : '.border-2',
                        textClass : 'helper-box border-2 border',
                    },
                    {
                        text : '.border-3',
                        textClass : 'helper-box border-3 border',
                    },
                    {
                        text : '.border-4',
                        textClass : 'helper-box border-4 border',
                    },
                    {
                        text : '.border-5',
                        textClass : 'helper-box border-5 border',
                    },
                    {
                        text : '.border-6',
                        textClass : 'helper-box border-6 border',
                    },
                    {
                        text : '.border-7',
                        textClass : 'helper-box border-7 border',
                    },
                    {
                        text : '.border-8',
                        textClass : 'helper-box border-8 border',
                    },
                    {
                        text : '.border-9',
                        textClass : 'helper-box border-9 border',
                    },
                    {
                        text : '.border-10',
                        textClass : 'helper-box border-10 border',
                    },
                ],
            },
            {
                title : 'Text Colors',
                colClass : 'col-xl-3 col-sm-6',
                divClass : 'border-wrapper alert-light-light h-100 dark-helper',
                data : [
                    {
                        text : '.txt-primary',
                        textClass : 'helper-box helper-text border txt-primary',
                    },
                    {
                        text : '.txt-secondary',
                        textClass : 'helper-box helper-text border txt-secondary',
                    },
                    {
                        text : '.txt-success',
                        textClass : 'helper-box helper-text border txt-success',
                    },
                    {
                        text : '.txt-danger',
                        textClass : 'helper-box helper-text border txt-danger',
                    },
                    {
                        text : '.txt-warning',
                        textClass : 'helper-box helper-text border txt-warning',
                    },
                    {
                        text : '.txt-info',
                        textClass : 'helper-box helper-text border txt-info',
                    },
                    {
                        text : '.txt-dark',
                        textClass : 'helper-box helper-text border txt-dark',
                    },
                    {
                        text : '.txt-light',
                        textClass : 'helper-box helper-text border txt-light bg-dark',
                    },
                ],
            },
        ]
    }
]

export const backgroundColorsData : commonHelperClasses[] = [
    {
        header : 'Background Colors',
        desc : 'Use the <code>.bg-* </code>and <code>.alert-light-*</code>colors in Boho theme.Use of any components.</p>',
        titleData : [
            {
                title : 'Dark Background',
                colClass : 'col-xl-4 col-sm-6',
                divClass : 'border-wrapper h-100 border',
                data : [
                    {
                        text : '.bg-primary',
                        textClass : 'helper-box bg-primary',
                    },
                    {
                        text : '.bg-secondary',
                        textClass : 'helper-box bg-secondary',
                    },
                    {
                        text : '.bg-success',
                        textClass : 'helper-box bg-success',
                    },
                    {
                        text : '.bg-danger',
                        textClass : 'helper-box bg-danger',
                    },
                    {
                        text : '.bg-warning',
                        textClass : 'helper-box bg-warning',
                    },
                    {
                        text : '.bg-info',
                        textClass : 'helper-box bg-info',
                    },
                    {
                        text : '.bg-dark',
                        textClass : 'helper-box bg-dark',
                    },
                    {
                        text : '.bg-light',
                        textClass : 'helper-box bg-light',
                    },
                ],
            },
            {
                title : 'Light Backgrounds',
                colClass : 'col-xl-4 col-sm-6',
                divClass : 'border-wrapper h-100 border',
                data : [
                    {
                        text : '.alert-light-primary',
                        textClass : 'helper-box alert-light-primary',
                    },
                    {
                        text : '.alert-light-secondary',
                        textClass : 'helper-box alert-light-secondary',
                    },
                    {
                        text : '.alert-light-success',
                        textClass : 'helper-box alert-light-success',
                    },
                    {
                        text : '.alert-light-danger',
                        textClass : 'helper-box alert-light-danger',
                    },
                    {
                        text : '.alert-light-warning',
                        textClass : 'helper-box alert-light-warning',
                    },
                    {
                        text : '.alert-light-info',
                        textClass : 'helper-box alert-light-info',
                    },
                    {
                        text : '.alert-light-dark',
                        textClass : 'helper-box alert-light-dark',
                    },
                    {
                        text : '.alert-light-light',
                        textClass : 'helper-box alert-light-light',
                    },
                ],
            },
            {
                title : 'Extended Background Colors',
                colClass : 'col-xl-4 col-sm-12',
                divClass : 'border-wrapper h-100 border',
                data : [
                    {
                        text : '.light-card',
                        textClass : 'helper-box light-card',
                    },
                    {
                        text : '.light-background',
                        textClass : 'helper-box light-background border',
                    },
                ],
            },
        ]
    }
]

export const borderColor : data[] = [
    {
        text : '.b-primary',
        textClass : 'primary',
    },
    {
        text : '.b-t-primary',
        textClass : 't-primary',
    },
    {
        text : '.b-b-primary',
        textClass : 'b-primary',
    },
    {
        text : '.b-l-primary',
        textClass : 'l-primary',
    },
    {
        text : '.b-r-primary',
        textClass : 'r-primary',
    },
    {
        text : '.b-secondary',
        textClass : 'secondary',
    },
    {
        text : '.b-t-secondary',
        textClass : 't-secondary',
    },
    {
        text : '.b-b-secondary',
        textClass : 'b-secondary',
    },
    {
        text : '.b-l-secondary',
        textClass : 'l-secondary',
    },
    {
        text : '.b-r-secondary',
        textClass : 'r-secondary',
    },
    {
        text : '.b-success',
        textClass : 'success',
    },
    {
        text : '.b-t-success',
        textClass : 't-success',
    },
    {
        text : '.b-b-success',
        textClass : 'b-success',
    },
    {
        text : '.b-l-success',
        textClass : 'l-success',
    },
    {
        text : '.b-r-success',
        textClass : 'r-success',
    },
    {
        text : '.b-danger',
        textClass : 'danger',
    },
    {
        text : '.b-t-danger',
        textClass : 't-danger',
    },
    {
        text : '.b-b-danger',
        textClass : 'b-danger',
    },
    {
        text : '.b-l-danger',
        textClass : 'l-danger',
    },
    {
        text : '.b-r-danger',
        textClass : 'r-danger',
    },
    {
        text : '.b-warning',
        textClass : 'warning',
    },
    {
        text : '.b-t-warning',
        textClass : 't-warning',
    },
    {
        text : '.b-b-warning',
        textClass : 'b-warning',
    },
    {
        text : '.b-l-warning',
        textClass : 'l-warning',
    },
    {
        text : '.b-r-warning',
        textClass : 'r-warning',
    },
    {
        text : '.b-info',
        textClass : 'info',
    },
    {
        text : '.b-t-info',
        textClass : 't-info',
    },
    {
        text : '.b-b-info',
        textClass : 'b-info',
    },
    {
        text : '.b-l-info',
        textClass : 'l-info',
    },
    {
        text : '.b-r-info',
        textClass : 'r-info',
    },
    {
        text : '.b-dark',
        textClass : 'dark',
    },
    {
        text : '.b-t-dark',
        textClass : 't-dark',
    },
    {
        text : '.b-b-dark',
        textClass : 'b-dark',
    },
    {
        text : '.b-l-dark',
        textClass : 'l-dark',
    },
    {
        text : '.b-r-dark',
        textClass : 'r-dark',
    },
    {
        text : '.b-light',
        textClass : 'light',
    },
    {
        text : '.b-t-light',
        textClass : 't-light',
    },
    {
        text : '.b-b-light',
        textClass : 'b-light',
    },
    {
        text : '.b-l-light',
        textClass : 'l-light',
    },
    {
        text : '.b-r-light',
        textClass : 'r-light',
    },
]

export const imageSizeData : images[] =[
    {
        imgClass : 'img-10 img-h-10',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-10',
    },
    {
        imgClass : 'img-20 img-h-20',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-20',
    },
    {
        imgClass : 'img-30 img-h-30',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-30',
    },
    {
        imgClass : 'img-40 img-h-40',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-40',
    },
    {
        imgClass : 'img-50 img-h-50',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-50',
    },
    {
        imgClass : 'img-60 img-h-60',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-60',
    },
    {
        imgClass : 'img-70 img-h-70',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-70',
    },
    {
        imgClass : 'img-80 img-h-80',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-80',
    },
    {
        imgClass : 'img-90 img-h-90',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-90',
    },
    {
        imgClass : 'img-100 img-h-100',
        img : 'assets/images/blog/comment.jpg',
        alt : 'img-size-100',
    },
]

export const FontWeightData : commonText[] = [
    {
        header : 'Font Weight',
        desc : 'Use the font-weight classes like: <code>.f-w-* [100/300/400/600/700/900]</code>',
        data : [
            {
                text : 'You can set light font weight heading .f-w-100',
                textClass : 'f-w-100'
            },
            {
                text : 'You can set light font weight heading .f-w-300',
                textClass : 'f-w-300'
            },
            {
                text : 'You can set light font weight heading .f-w-400',
                textClass : 'f-w-400'
            },
            {
                text : 'You can set light font weight heading .f-w-600',
                textClass : 'f-w-600'
            },
            {
                text : 'You can set light font weight heading .f-w-700',
                textClass : 'f-w-700'
            },
            {
                text : 'You can set light font weight heading .f-w-900',
                textClass : 'f-w-900'
            },
        ]
    }
]

export const textColorData : commonText[] = [
    {
        header : 'Text Colors',
        desc : 'Use the text color for <code>.font-*</code> class.',
        data : [
            {
                text : 'This is a font-primary text used class as .font-primary',
                textClass : 'font-primary'
            },
            {
                text : 'This is a font-secondary text used class as .font-secondary',
                textClass : 'font-secondary'
            },
            {
                text : 'This is a font-success text used class as .font-success',
                textClass : 'font-success'
            },
            {
                text : 'This is a font-danger text used class as .font-danger',
                textClass : 'font-danger'
            },
            {
                text : 'This is a font-warning text used class as .font-warning',
                textClass : 'font-warning'
            },
            {
                text : 'This is a font-info text used class as .font-info',
                textClass : 'font-info'
            },
            {
                text : 'This is a font-dark text used class as .font-dark',
                textClass : 'font-dark'
            },
        ]
    }
]

export const fontSizeData : data[] = [
    {
        text : 'Font-size .f-14',
        textClass : 'f-14'
    },
    {
        text : 'Font-size .f-16',
        textClass : 'f-16'
    },
    {
        text : 'Font-size .f-18',
        textClass : 'f-18'
    },
    {
        text : 'Font-size .f-20',
        textClass : 'f-20'
    },
    {
        text : 'Font-size .f-22',
        textClass : 'f-22'
    },
    {
        text : 'Font-size .f-24',
        textClass : 'f-24'
    },
    {
        text : 'Font-size .f-26',
        textClass : 'f-26'
    },
    {
        text : 'Font-size .f-28',
        textClass : 'f-28'
    },
    {
        text : 'Font-size .f-30',
        textClass : 'f-30'
    },
    {
        text : 'Font-size .f-32',
        textClass : 'f-32'
    },
    {
        text : 'Font-size .f-34',
        textClass : 'f-34'
    },
    {
        text : 'Font-size .f-36',
        textClass : 'f-36'
    },
    {
        text : 'Font-size .f-38',
        textClass : 'f-38'
    },
    {
        text : 'Font-size .f-40',
        textClass : 'f-40'
    },
]
