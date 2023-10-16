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

export const getUserSchema = z.object({
    id_user: z.number({required_error: "Debe haber un id"}),
    username: z.string({required_error: "Debe haber un username UNICO"}),
    name: z.string({ required_error:"Debe haber name"}),
    lastname: z.string({ required_error: "Debe haber lastname"}),
    rol: z.number().refine(value => value === 0 ||  value === 1, {message: "Debe ser 0 o 1"}),
    profession: z.string().optional(),
    description: z.string().optional(),
    image_url: z.string().optional(),
    followersCount: z.number(),
    followingsCount: z.number(),    
    isFollowing: z.boolean(),
    articlesByUser: z.array(z.object({
        image_url: z.string({ required_error:'Debe haner imagen'}),
        title: z.string({ required_error:'Debe haner imagen'}),
        id_article: z.number({ required_error:'Debe haber numero'}),
    })).optional()
}).strict();

export const updateUserSchema = z.object({
    username: z.string({required_error: "Debe haber un username UNICO"}),
    name: z.string({ required_error:"Debe haber name"}),
    lastname: z.string({ required_error: "Debe haber lastname"}),
    rol: z.number().refine(value => value === 0 ||  value === 1, {message: "Debe ser 0 o 1"}),
    profession: z.string().optional(),
    description: z.string().optional(),
    image_url: z.string().optional(),
    password: z.string().optional()
}).strict();

export const updatePasswordSchema = z.object({
    username: z.string({required_error:"debe haber username"}),
    currentPassword: z.string({required_error:"debe haber contraseña"}),
    newPassword: z.string({required_error:"debe haber nueva contraseña"})
}).strict()

export const checkPasswordSchema = z.object({
    username: z.string({required_error:"debe haber username"}),
    password: z.string({required_error:"debe haber username"})
}).strict()

export const getFollowerSchema = z.object({
    id_user: z.number({required_error:"debe haber user_id"}),
    name: z.string({required_error:"debe haber nombre"}),
    lastname: z.string({required_error:"debe haber lastname"}),
    username: z.string({required_error:"debe haber username"}),
    rol: z.number({required_error:"debe haber rol"}),
    image_url: z.string({required_error:"debe haber imagen"})
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
    image_url: z.any({}).refine((val: any) => val !== undefined),
    image_extension: z.string(),
    ancho: z.number(),
    image_ratio: z.string()
    // z.number({ required_error: "Debe haber ua imagen" }),
}).strict();

export const getArticleSchema = z.object({
    id_article: z.number({required_error: 'Debe haber un id del articulo'}),
    title: z.string({ required_error: "Debe haber un título" }),
    date: z.string({required_error: "Debe haber una fecha"}),
    views: z.number().optional(),
    text: z.string({ required_error: "Debe haber un texto" }),
    image_url: z.any({}).refine((val: any) => val !== undefined),
    writer: z.object({
        id_user:z.number(),
        username: z.string(),
    }).strict(),
    category: z.array(z.object({category:z.object({cat_name: z.string().optional()})}))
    // z.number({ required_error: "Debe haber ua imagen" }),
}).strict();
