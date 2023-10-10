import { z } from 'zod';
import { createArticleSchema, getArticleSchema} from '../schemas/schemas'; // Asegúrate de importar el esquema adecuado

export type createArticleType = z.infer<typeof createArticleSchema>;
 export type getArticleType = z.infer<typeof getArticleSchema>;

 export interface aiModelInfoType{
    titulos:Array<string>,
    categories:Array<string>
}