import { TJwtData } from "../models/jwt-data";

export interface IAuthenticator {
    auth(account:TJwtData):string
}