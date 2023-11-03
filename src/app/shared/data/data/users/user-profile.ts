
export interface UserprofileI {
    uid: string | undefined,
    type: string,
    name: string,
    occupation: string,
    bio: string,
    email: string,
    password: string,
    url: string
}

export class Userprofile implements UserprofileI {
    uid: string | undefined = undefined
    type: string = ''
    name: string = ''
    occupation: string = ''
    bio: string = ''
    email: string = ''
    password: string = ''
    url: string = ''
}
