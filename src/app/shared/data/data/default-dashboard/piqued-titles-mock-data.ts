export interface PiquedTitlesType {
  uid: string;
  pid: string;
  img: string;
  title: string;
  subtitle: string;
  datePublished: string;
}

export const piquedTitlesData: PiquedTitlesType[] = [
  {
    uid: '1',
    pid: '1',
    img: 'assets/images/dashboard-2/selling/01.png',
    title: 'Samsung TV',
    subtitle: 'Women`s',
    datePublished: '2023-10-01',
  },
  {
    uid: '1',
    pid: '2',
    img: 'assets/images/dashboard-2/selling/02.png',
    title: 'Leather Belt',
    subtitle: 'Men’s',
    datePublished: '2023-10-02',
  },
  {
    uid: '1',
    pid: '3',
    img: 'assets/images/dashboard-2/selling/03.png',
    title: 'Male Suit',
    subtitle: 'Women’s',
    datePublished: '2023-10-03',
  },
  {
    uid: '1',
    pid: '',
    img: 'assets/images/dashboard-2/selling/04.png',
    title: 'Female Dress',
    subtitle: 'Women`s',
    datePublished: '2023-10-04',
  },
];
