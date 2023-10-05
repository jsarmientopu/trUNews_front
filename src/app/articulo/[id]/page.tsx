
import PostComponent from "@/components/PostComponent"
import { getPost } from "@/utils/fetchs"


export default async function Articulo({ params }: any) {

    const post = await getPost(params.id)

    

    return (
        <>
            <PostComponent id = {post.articles_id_article} image_url = {post.image_url} title = {post.title} text = {post.text} date = {post.date} author = {post.writer.username} />
        </>

    )
}