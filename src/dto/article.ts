import { z } from 'zod';
import { createArticleSchema } from '../schemas/schemas'; // Asegúrate de importar el esquema adecuado

export type createArticleType = z.infer<typeof createArticleSchema>;
