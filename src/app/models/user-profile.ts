
export interface Userprofile {
    uid: string | undefined,
    type: string
    name: string,
    occupation: string,
    bio: string,
    email: string,
    password: string,
    url: string
}

export const UserprofileData: Userprofile[] = [
    {
        uid: undefined,
        type: 'author',
        name: 'Edward A Carmona',
        occupation: 'Systems Engineer',
        bio: 'Looking to Jesus, the author and finisher of my faith',
        email: 'edward.a.carmona@gmail.com',
        password: 'password',
        url: 'edwardcarmona.com',
    }
]