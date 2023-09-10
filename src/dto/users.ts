import { z } from 'zod'
import { checkPasswordSchema, createUserSchema } from '../schemas/schemas'

export type createUserType = z.infer<typeof createUserSchema>
export type checkPasswordType = z.infer<typeof checkPasswordSchema>

export interface redoTokenType {
    userId:number,
    hash:string,
    rol:number
}
