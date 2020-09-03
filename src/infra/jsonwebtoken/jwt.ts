import jwt from 'jsonwebtoken'
import { TJwtData } from '../../presentation/models/jwt-data'
import { IAuthenticator } from '../../presentation/protocols/authenticator'

export class JwtAdapter implements IAuthenticator{
    
    auth(account: TJwtData): string {
        return jwt.sign(account, process.env.JWT_KEY, {expiresIn:'1h'})
    }
    
} 