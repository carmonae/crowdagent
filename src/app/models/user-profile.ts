
export interface UserprofileI {
    uid: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string
}

export class Userprofile implements UserprofileI 
    {
        uid: string = ''
        firstname: string = 'Loading...'
        lastname: string = 'Loading ...'
        email: string = 'Loading ...'
        phone: string = 'Loading ...'
    }
