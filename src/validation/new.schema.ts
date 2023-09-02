import { z } from "zod";

const NewSchema = z.object({
    title: z.string().min(8).max(255),
    body: z.string().min(8).max(4000),
    tags: z.array(z.string()).min(1).max(5).optional(),
    authorId: z.string().uuid(),
    tumbnail: z.string().url(),
})

const obj = {
    title: "Hello World",
    body: "This is a test",
    tags: ["deportes", "politica"],
    authorId: "123e4567-e89b-12d3-a456-426614174000",
    tumbnail: "https://www.google.com",
}

export type NewType = z.infer<typeof NewSchema>;
export default NewSchema;