
import PostComponent from "@/components/PostComponent"

async function getPost(id: number) {
    const res = await fetch(`http://localhost:3005/articles/${id}`)
    const post = res.json()
    return post
}


export default async function Articulo({ params }: any) {

    const post = await getPost(params.id)

    return (
        <>
            <PostComponent image_url = {post.image_url} title = {post.title} text = {post.text} />
        </>

    )
}