export interface commonDetails {
    id: number;
    class: string;
    title: string,
    data: string,
    img: string,
    icon: string,
    iconClass: string;
    profit: string,
    profitColor: string,
    progress: string;
    progressColor: string;
    isCollasped: boolean;
}

export const titlePiquesData: commonDetails = {
    id: 1,
    class: 'profit-card',
    title: 'Title Piques',
    data: '6542',
    img: 'assets/images/dashboard-2/total-icon/users.png',
    icon: 'sort-desc',
    iconClass: 'down',
    profit: '- 12.32%',
    profitColor: 'secondary',
    progress: '35%',
    progressColor: 'primary',
    isCollasped: false
}

export const abstractPiquesData: commonDetails = {
    id: 1,
    class: 'orders-card',
    title: 'Abstract Piques',
    data: '659',
    img: 'assets/images/dashboard-2/total-icon/order.png',
    icon: 'sort-up',
    iconClass: 'up',
    profit: '+ 12.32%',
    profitColor: 'primary',
    progress: '45%',
    progressColor: 'secondary',
    isCollasped: false
}

export const manuscriptsPiquesData: commonDetails = {
    id: 1,
    class: 'products-card',
    title: 'Manuscript Piques',
    data: '319',
    img: 'assets/images/dashboard-2/total-icon/product.png',
    icon: 'sort-up',
    iconClass: 'up',
    profit: '+ 12.32%',
    profitColor: 'dark',
    progress: '65%',
    progressColor: 'dark',
    isCollasped: false
}
