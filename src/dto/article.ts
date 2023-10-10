import { z } from 'zod';
import { createArticleSchema, getArticleSchema} from '../schemas/schemas'; // Asegúrate de importar el esquema adecuado

export type createArticleType = z.infer<typeof createArticleSchema>;
<<<<<<< HEAD
 export type getArticleType = z.infer<typeof getArticleSchema>;

 export interface aiModelInfoType{
    titulos:Array<string>,
    categories:Array<string>
}
=======
export type getArticleType = z.infer<typeof getArticleSchema>;


export interface articlesWriter {
    username: string;
    name: string;
    lastname: string;
  }
  export interface returnArticles extends articlesWriter {
      id_article: number;
      id_writer: number;
      title?: string| null;
      date: Date;
      views: number;
      image_url: string;
      text: string;
    }
  
    export interface article_has_categories {
      category: {cat_name:string};
    }
    export interface returnArticlesCategory extends returnArticles {
      article_has_categories: article_has_categories[]
    }
>>>>>>> 86e51d4d20f6a7630d3b45578af61e539fe44766
