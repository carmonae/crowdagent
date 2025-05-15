export interface UserDetailsI {
    role: string,
    penName: string,
    slogan: string
    address: string,
    city: string,
    country: string,
    postalCode: string,
    about: string,
    website: string,
    twitter: string,
    facebook: string,
    instagram: string,
    linkedin: string,
    youtube: string,
    tiktok: string,
    github: string,
    avatarUrl: string,
}

export class UserDetails implements UserDetailsI {
    role: string = ''
    penName: string = ''
    slogan: string = ''
    avatarUrl: string = ''
    address: string = ''
    city: string = ''
    country: string = ''
    postalCode: string = ''
    about: string = ''
    website: string = ''
    twitter: string = ''
    facebook: string = ''
    instagram: string = ''
    linkedin: string = ''
    youtube: string = ''
    tiktok: string = ''
    github: string = ''}
