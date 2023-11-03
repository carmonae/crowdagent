export interface projectList{
  id : number;
  title : string;
  badge : string;
  img : string;
  sites : string;
  desc : string;
  issue : number;
  resolved : number;
  comment : number;
  like : number;
  progress : number;
  customers_img1 : string;
  customers_img2 : string;
  customers_img3 : string;
  projectLevel : string;
}

export const ProjectList : projectList[] = [
    {
        id: 1,
        title: 'Endless admin Design',
        badge: 'Doing',
        img: "assets/images/user/3.jpg",
        sites: 'Themeforest, australia',
        desc: 'Endless Admin is a full featured, multipurpose, premium bootstrap admin template.',
        issue: 12,
        resolved: 5,
        comment: 7,
        like: 10,
        progress: 70,
        customers_img1: "assets/images/user/3.jpg",
        customers_img2: "assets/images/user/5.jpg",
        customers_img3: "assets/images/user/1.jpg",
        projectLevel: '70%'
    },
    {
        id: 2,
        title: 'Universal admin Design',
        badge: 'Done',
        img: 'assets/images/user/3.jpg',
        sites: 'Envato, australia',
        desc: 'Universal Admin is a full featured, multipurpose, premium bootstrap admin template.',
        issue: 24,
        resolved: 24,
        comment: 40,
        like: 3,
        progress: 100,
        customers_img1: 'assets/images/user/3.jpg',
        customers_img2: 'assets/images/user/5.jpg',
        customers_img3: 'assets/images/user/1.jpg',
        projectLevel: '100%'
      },
      {
        id: 3,
        title: 'Poco admin Design',
        badge: 'Done',
        img: 'assets/images/user/3.jpg',
        sites: 'Envato, australia',
        desc: 'Poco Admin is a full featured, multipurpose, premium bootstrap admin template.',
        issue: 40,
        resolved: 40,
        comment: 20,
        like: 2,
        progress: 100,
        customers_img1: 'assets/images/user/3.jpg',
        customers_img2: 'assets/images/user/5.jpg',
        customers_img3: 'assets/images/user/1.jpg',
        projectLevel: '100%'
      },
      {
        id: 4,
        title: 'Universal admin Design',
        badge: 'Done',
        img: 'assets/images/user/3.jpg',
        sites: 'Envato, australia',
        desc: 'Universal Admin is a full featured, multipurpose, premium bootstrap admin template.',
        issue: 24,
        resolved: 24,
        comment: 40,
        like: 3,
        progress: 100,
        customers_img1: 'assets/images/user/3.jpg',
        customers_img2: 'assets/images/user/5.jpg',
        customers_img3: 'assets/images/user/1.jpg',
        projectLevel: '100%'
      },
      {
        id: 5,
        title: 'Endless admin Design',
        badge: 'Doing',
        img: 'assets/images/user/3.jpg',
        sites: 'Themeforest, australia',
        desc: 'Endless Admin is a full featured, multipurpose, premium bootstrap admin template.',
        issue: 12,
        resolved: 5,
        comment: 7,
        like: 1,
        progress: 70,
        customers_img1: 'assets/images/user/3.jpg',
        customers_img2: 'assets/images/user/5.jpg',
        customers_img3: 'assets/images/user/1.jpg',
        projectLevel: '70%'
      },
      {
        id: 6,
        title: 'Poco admin Design',
        badge: 'Done',
        img: 'assets/images/user/6.jpg',
        sites: 'Envato, australia',
        desc: 'Poco Admin is a full featured, multipurpose, premium bootstrap admin template.',
        issue: 40,
        resolved: 40,
        comment: 20,
        like: 2,
        progress: 100,
        customers_img1: 'assets/images/user/3.jpg',
        customers_img2: 'assets/images/user/5.jpg',
        customers_img3: 'assets/images/user/1.jpg',
        projectLevel: '100%'
      },
]