export type TAccountAuthenticateParams = {
    email:string
    password:string
}

export type TAccountAuthenticated = {
    email: string
    id:string
    name:string
    jwt: string
}