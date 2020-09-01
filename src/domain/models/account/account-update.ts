export type TAccountUpdate = {
    id:string
    name?:string
    email?:string
    password?:string
    isActive?: boolean
    newPassword?:string
    newPasswordConfirmation?:string
}