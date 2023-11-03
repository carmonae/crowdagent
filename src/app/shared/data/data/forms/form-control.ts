export interface variationRadioPayment{
    title : string;
    data : {
        id : string;
        name : string;
        text : string;
        image? : string;
        icon? : string;
        checked : boolean;
    }[]
}[]

export const borderedCheckBox = [
    {
        color : 'primary',
        id : 'checkbox-primary-1',
        title : 'Primary - checkbox-primary',
        checked : true,
    },
    {
        color : 'secondary',
        id : 'checkbox-secondary',
        title : 'Secondary - checkbox-secondary',
        checked : false,
    },
    {
        color : 'success',
        id : 'checkbox-primary',
        title : 'Success - checkbox-success',
        checked : false,
    },
]

export const iconCheckBox = [
    {
        id : 'checkbox-icon',
        icon : 'sliders',
        title : 'Sliders',
        checked : false,
    },
    {
        id : 'checkbox-icon1',
        icon : 'user',
        title : 'User',
        checked : true,
    },
    {
        id : 'checkbox-icon2',
        icon : 'tags',
        title : 'Tags',
        checked : false,
    },
    {
        id : 'checkbox-icon3',
        icon : 'android',
        title : 'Android',
        checked : false,
    },
    {
        id : 'checkbox-icon4',
        icon : 'eye-slash',
        title : 'Hidden',
        checked : false,
    },
    {
        id : 'checkbox-icon5',
        icon : 'folder-open',
        title : 'Folder',
        checked : false,
    },
    {
        id : 'checkbox-icon6',
        icon : 'paper-plane',
        title : 'Send',
        checked : false,
    },
    {
        id : 'checkbox-icon7',
        icon : 'cloud-upload',
        title : 'Upload',
        checked : false,
    },
]

export const filledCheckBox = [
    {
        color : 'warning',
        id : 'solid4',
        title : 'Warning - checkbox-solid-warning',
        checked : true,
    },
    {
        color : 'danger',
        id : 'solid5',
        title : 'Danger - checkbox-solid-danger',
        checked : false,
    },
    {
        color : 'info',
        id : 'solid6',
        title : 'Info - checkbox-solid-info',
        checked : false,
    },
]

export const variationRadioPaymentData : variationRadioPayment[] = [
    {
        title : 'Select your payment method',
        data : [
            {
                id : 'ptm11',
                name : 'radio1',
                text : 'BOB',
                image : 'assets/images/ecommerce/card.png',
                checked : false,
            },
            {
                id : 'ptm22',
                name : 'radio1',
                text : 'MasterCard',
                image : 'assets/images/ecommerce/mastercard.png',
                checked : true,
            },
            {
                id : 'ptm33',
                name : 'radio1',
                text : 'Paypal',
                image : 'assets/images/ecommerce/paypal.png',
                checked : false,
            },
            {
                id : 'ptm44',
                name : 'radio1',
                text : 'VISA',
                image : 'assets/images/ecommerce/visa.png',
                checked : false,
            },
        ]
    },
]

export const variationRadioDesign : variationRadioPayment[] = [

    {
        title : 'What are the most important things to learn about web design?',
        data : [
            {
                id : 'ptm101',
                name : 'radio3',
                text : 'A. HTML',
                checked : false,
                
                
            },
            {
                id : 'ptm201',
                name : 'radio3',
                text : 'B. CSS',
                checked : false,
                
            },
            {
                id : 'ptm301',
                name : 'radio3',
                text : 'C. Javascript',
                checked : true,
                
            },
            {
                id : 'ptm401',
                name : 'radio3',
                text : 'D. Above the all',
                checked : false,
                
            },
        ]
    },
]

export const variationRadioIcon : variationRadioPayment[]= [
    {
        title : 'Radios With Creative Options & SVG Icons',
        data : [
            {
                id : 'ptm100',
                name : 'radio2',
                text : 'The notification icon displayed new messages.',
                icon : 'assets/images/svg/forms/notification.svg',  
                checked : false,
            },
            {
                id : 'ptm200',
                name : 'radio2',
                text : 'The download icon indicated completion.',
                icon : 'assets/images/svg/forms/stroke-calendar.svg',
                checked : false,
            },
            {
                id : 'ptm300',
                name : 'radio2',
                text : 'The tag icon allowed easy categorization.',
                icon : 'assets/images/svg/forms/tag.svg',
                checked : true,
                
                
            },
            {
                id : 'ptm400',
                name : 'radio2',
                text : 'The email icon was inaccessibly located.',
                icon : 'assets/images/svg/forms/stroke-email.svg',
                checked : false,
                
            },
        ]
    }
]

export const variationCheckbox = [
    {
        title : 'Which of the following activities do you enjoy doing in your free time?',
        data : [
            {
                id : 'check-a',
                text : 'Reading',
                color : 'success',
                checked : false,
            },
            {
                id : 'check-b',
                text : 'Watching TV',
                color : 'success',
                checked : true,
            },
            {
                id : 'check-c',
                text : 'Listening to music',
                color : 'danger',
                checked : false,
            },
            {
                id : 'check-d',
                text : 'Playing video games',
                color : 'danger',
                checked : false,
            },
            {
                id : 'check-e',
                text : 'Painting/Drawing',
                color : 'success',
                checked : false,
            },
        ]
    }
]

export const themeSale = [
    {
        id : 'feature1',
        text : 'Voxo',
        sale : '270',
        checked : false,
    },
    {
        id : 'feature2',
        text : 'boho',
        sale : '4.8K',
        checked : false,
    },
    {
        id : 'feature3',
        text : 'Multikart',
        sale : '2.6k',
        checked : false,
    },
    {
        id : 'feature4',
        text : 'Viho',
        sale : '2k',
        checked : true,
    },
]

export const defaultStyle = [
    {
        title : 'COD',
        text : 'Estimated 2 Day Shipping ( Duties end tax may be due delivery )',
        price : '50',
        color : 'primary',
        id : 'radio14'
    },
    {
        title : 'Fast',
        text : 'Estimated 1 Day Shipping ( Duties end tax may be due delivery )',
        price : '100',
        color : 'secondary',
        id : 'radio13'
    },
]

export const withoutBorder = [
    {
        price : '39',
        text : 'Plans for 2/4/6 months are offered to new clients.',
        tag : '100 MBPS',
        color : 'warning',
        checked : true,
        id : 'checkbox11'
    },
    {
        price : '50',
        text : 'Plans for 2 years projects offered to new clients.',
        tag : 'HIRED',
        color : 'info',
        checked : false,
        id : 'checkbox22'
    },
]

export const verticalStyle = [
    {
        title : 'COD',
        tag : '50 INR',
        tagColor : 'primary',
        text : 'Estimated 10 to 15 Day Shipping ( Duties end tax may be due delivery )',
        checked : false,
        id : 'radio23'
    },
    {
        title : 'FAST',
        tag : '100 INR',
        tagColor : 'secondary',
        text : 'Estimated 10 to 12 Day Shipping ( Duties end tax may be due delivery )',
        checked : false,
        id : 'radio24'
    },
    {
        title : 'STANDARD',
        tag : '80 INR',
        tagColor : 'success',
        text : 'Estimated 3 to 5 Day Shipping ( Duties end tax may be due delivery )',
        checked : false,
        id : 'radio25'
    },
    {
        title : 'LOCAL',
        tag : 'FREE',
        tagColor : 'info',
        text : 'Estimated 3 to 5 Day Shipping ( Duties end taxes may be due upon delivery )',
        checked : true,
        id : 'radio5'
    },
]


