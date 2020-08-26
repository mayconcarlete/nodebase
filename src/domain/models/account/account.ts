export type TAccount = { 
    id:string
    name:string
    email:string
    password:string
    isActive: boolean
}

type omitIsActive = Omit<TAccount, 'isActive'>

export type TAccountParams = Omit<omitIsActive, 'id'>