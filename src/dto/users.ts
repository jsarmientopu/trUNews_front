import { z } from 'zod'
import { checkPasswordSchema, createUserSchema, decryptJWTSchema, decryptedJWTSchema, getUserSchema, updateUserSchema, updatePasswordSchema, getFollowerSchema} from '../schemas/schemas'

export type createUserType = z.infer<typeof createUserSchema>
export type getUserType = z.infer<typeof getUserSchema>
export type checkPasswordType = z.infer<typeof checkPasswordSchema>

export interface redoTokenType {
    userId:number,
    hash:string,
    rol:number
}

export type decryptJWT = z.infer<typeof decryptJWTSchema>

export type decryptedJWT = z.infer<typeof decryptedJWTSchema>

export type updateUserType = z.infer<typeof updateUserSchema>

export type updatePasswordType= z.infer<typeof updatePasswordSchema>

export type getFollowerType = z.infer<typeof getFollowerSchema>

export interface imageType{
    contenido:string,
    extension:string,
    width:number,
    ratio:string
}