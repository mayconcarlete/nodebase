export type TAccount = { 
    id:string
    name:string
    email:string
    password:string
}

export type TAccountParams = Omit<TAccount, 'id'>