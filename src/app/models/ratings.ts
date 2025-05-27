export interface RatingTuple {
  projId: string;
  readerId: string;
  personalRating: number;
  predictedRating: number;
  bet: number;
}

export interface legendI {
  level: Number;
  designation: string;
  description: string;
}

export const legendData: legendI[] = [
  {
    level: 1,
    designation: 'Disaster',
    description:
      'Universally panned, unreadable, possibly offensive or nonsensical',
  },
  {
    level: 2,
    designation: 'Flop',
    description: 'Released but ignored or quickly forgotten, abysmal sales',
  },
  {
    level: 3,
    designation: 'Shelf Dust',
    description: 'Sat on shelves without attention, low engagement',
  },
  {
    level: 4,
    designation: 'Dud',
    description: 'Opened with some interest but quickly fizzled',
  },
  {
    level: 5,
    designation: 'Misfire',
    description: 'Conceptually promising but poorly executed',
  },
  {
    level: 6,
    designation: 'Flatline',
    description: 'No momentum, no buzz, no legacy',
  },
  {
    level: 7,
    designation: 'Ghost Release',
    description: 'Technically published, but barely noticed',
  },
  {
    level: 8,
    designation: 'Silent Print',
    description: 'Read by a niche few, no lasting footprint',
  },
  {
    level: 9,
    designation: 'Underwhelmer',
    description: 'Decent craft, but left no impression',
  },
  {
    level: 10,
    designation: 'Passable',
    description: 'Solid writing, average reviews, unremarkable lifespan',
  },
  {
    level: 11,
    designation: 'Midlist',
    description:
      'Respectable but routine; occupies the middle of bookstore relevance',
  },
  {
    level: 12,
    designation: 'Moderate Hit',
    description: 'Some sales, some reviews, decent word-of-mouth',
  },
  {
    level: 13,
    designation: 'Cult Niche',
    description: 'Loved by a small, loyal audience — but not mainstream',
  },
  {
    level: 14,
    designation: 'Talked About',
    description: 'Gaining traction, recommended among friends',
  },
  {
    level: 15,
    designation: 'Sleeper Hit',
    description: 'Slow start, but momentum builds',
  },
  {
    level: 16,
    designation: 'Breakout',
    description: 'Breaks into the wider reading public, gets media attention',
  },
  {
    level: 17,
    designation: 'Fan Favorite',
    description: 'Has a strong, emotionally loyal fanbase',
  },
  {
    level: 18,
    designation: 'Bestseller',
    description: 'High sales, buzzworthy, seen in airports and book clubs',
  },
  {
    level: 19,
    designation: 'Classic',
    description:
      'Widely read across generations, studied or quoted, deep impact',
  },
  {
    level: 20,
    designation: 'Canonized',
    description:
      'Timeless masterpiece; defines a genre or era, universally praised',
  },
];
