import { z } from 'zod'
import { checkPasswordSchema, createUserSchema, decryptJWTSchema, decryptedJWTSchema} from '../schemas/schemas'

export type createUserType = z.infer<typeof createUserSchema>
export type checkPasswordType = z.infer<typeof checkPasswordSchema>

export interface redoTokenType {
    userId:number,
    hash:string,
    rol:number
}

export type decryptJWT = z.infer<typeof decryptJWTSchema>

export type decryptedJWT = z.infer<typeof decryptedJWTSchema>
