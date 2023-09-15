import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string({required_error: "Debe haber un username UNICO"}),
    name: z.string({ required_error:"Debe haber name"}),
    password: z.string(),
    lastname: z.string({ required_error: "Debe haber lastname"}),
    rol: z.number().refine(value => value === 0 ||  value === 1, {message: "Debe ser 0 o 1"}),
    profession: z.string().optional(),
    description: z.string().optional()

}).strict();


export const checkPasswordSchema = z.object({
    username: z.string({required_error:"debe haber username"}),
    password: z.string({required_error:"debe haber username"})
}).strict()

export const decryptJWTSchema = z.object({
  token: z.string({required_error:"debe haber token"})

})

export const decryptedJWTSchema = z.object({
  userId: z.number({required_error:"debe haber userId"}),
  rol: z.number({required_error:"debe haber rol"})

})

export const createArticleSchema = z.object({
    title: z.string({ required_error: "Debe haber un título" }),
    date: z.string({required_error: "Debe haber una fecha"}),
    views: z.number().optional(),
    id_writer: z.number(),
    text: z.string({ required_error: "Debe haber un texto" }),
    image_url: z.any({}).refine((val: any) => val !== undefined) 
    // z.number({ required_error: "Debe haber ua imagen" }),
}).strict();

