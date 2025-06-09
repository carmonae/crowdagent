export interface UserDetailsI {
  role: string;
  penName: string;
  slogan: string;
  genre: string[];
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  about: string;
  website: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  github: string;
  avatarUrl: string;
}

export class UserDetails implements UserDetailsI {
  role: string = '';
  penName: string = '';
  slogan: string = '';
  genre: string[] = [];
  subgenre: string = '';
  avatarUrl: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  country: string = '';
  about: string = '';
  website: string = '';
  twitter: string = '';
  facebook: string = '';
  instagram: string = '';
  linkedin: string = '';
  youtube: string = '';
  tiktok: string = '';
  github: string = '';
}
